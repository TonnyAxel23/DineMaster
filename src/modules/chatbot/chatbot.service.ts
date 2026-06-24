// src/modules/chatbot/chatbot.service.ts
import OpenAI from 'openai';
import { config } from '../../config/environment';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../../shared/middleware/errorHandler';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

export class ChatbotService {
  private static instance: ChatbotService;
  
  static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  async getRestaurantContext(restaurantId?: string) {
    if (!restaurantId) return null;
    
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        menuItems: {
          where: { isAvailable: true },
          take: 50,
          include: { category: true }
        },
        menuCategories: {
          where: { isActive: true }
        }
      }
    });
    
    return restaurant;
  }

  async generateResponse(userMessage: string, userId: string, restaurantId?: string) {
    try {
      // Get conversation history
      let conversation = await prisma.conversation.findFirst({
        where: { userId, restaurantId: restaurantId || null }
      });
      
      const messages = conversation?.messages as any[] || [];
      
      // Get restaurant context
      const restaurantContext = await this.getRestaurantContext(restaurantId);
      
      // Build system prompt
      let systemPrompt = `You are DineMaster AI, a helpful restaurant assistant for customers. 
You help with:
- Answering questions about restaurants, menus, and dishes
- Making dish recommendations based on preferences
- Explaining ordering and reservation processes
- Providing information about deals and specials

Keep responses friendly, concise, and helpful.`;

      if (restaurantContext) {
        systemPrompt += `

Restaurant: ${restaurantContext.name}
Cuisine: ${restaurantContext.cuisineType}
Hours: ${restaurantContext.openingTime} - ${restaurantContext.closingTime}

Available Menu Categories:
${restaurantContext.menuCategories.map((c: any) => `- ${c.name}`).join('\n')}

Sample Menu Items:
${restaurantContext.menuItems.slice(0, 20).map((item: any) => 
  `- ${item.name}: KES ${item.price} (${item.category?.name || 'Uncategorized'})`
).join('\n')}

If asked about items not in this list, politely inform the customer and suggest similar alternatives.`;
      }
      
      // Prepare messages for OpenAI
      const chatMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-10), // Last 10 messages for context
        { role: 'user', content: userMessage }
      ];
      
      // Get AI response
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: chatMessages as any,
        temperature: 0.7,
        max_tokens: 300
      });
      
      const aiResponse = completion.choices[0].message.content;
      
      // Save conversation
      const updatedMessages = [...messages, 
        { role: 'user', content: userMessage, timestamp: new Date() },
        { role: 'assistant', content: aiResponse, timestamp: new Date() }
      ];
      
      if (conversation) {
        await prisma.conversation.update({
          where: { id: conversation.id },
          data: { 
            messages: updatedMessages,
            updatedAt: new Date()
          }
        });
      } else {
        await prisma.conversation.create({
          data: {
            userId,
            restaurantId: restaurantId || null,
            messages: updatedMessages
          }
        });
      }
      
      return {
        response: aiResponse,
        conversationId: conversation?.id
      };
    } catch (error) {
      console.error('Chatbot error:', error);
      throw new AppError('AI service temporarily unavailable', 503);
    }
  }
}