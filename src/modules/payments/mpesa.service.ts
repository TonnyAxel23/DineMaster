// src/modules/payments/mpesa.service.ts
import axios from 'axios';
import { config } from '../../config/environment';
import { AppError } from '../../shared/middleware/errorHandler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MpesaService {
  private static instance: MpesaService;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  static getInstance(): MpesaService {
    if (!MpesaService.instance) {
      MpesaService.instance = new MpesaService();
    }
    return MpesaService.instance;
  }

  private async getAccessToken(): Promise<string> {
    // Check if token is still valid
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = Buffer.from(
      `${config.MPESA_CONSUMER_KEY}:${config.MPESA_CONSUMER_SECRET}`
    ).toString('base64');

    const url = config.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
      : 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Basic ${auth}`
        }
      });

      this.accessToken = response.data.access_token;
      this.tokenExpiry = new Date(Date.now() + (response.data.expires_in * 1000));
      
      return this.accessToken;
    } catch (error) {
      console.error('M-Pesa token error:', error);
      throw new AppError('Failed to authenticate with M-Pesa', 500);
    }
  }

  async initiateSTKPush(phoneNumber: string, amount: number, orderId: string, accountReference: string) {
    const token = await this.getAccessToken();
    
    const timestamp = this.getTimestamp();
    const password = Buffer.from(
      `${config.MPESA_SHORTCODE}${config.MPESA_PASSKEY}${timestamp}`
    ).toString('base64');

    const url = config.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    // Format phone number (254XXXXXXXXX)
    const formattedPhone = phoneNumber.replace(/^0+/, '254').replace(/^\+/, '');

    const requestBody = {
      BusinessShortCode: config.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: config.MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: config.MPESA_CALLBACK_URL,
      AccountReference: accountReference,
      TransactionDesc: `Payment for order ${orderId}`
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Save checkout request ID
      await prisma.payment.update({
        where: { orderId },
        data: {
          checkoutRequestID: response.data.CheckoutRequestID,
          merchantRequestID: response.data.MerchantRequestID
        }
      });

      return {
        checkoutRequestID: response.data.CheckoutRequestID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription
      };
    } catch (error) {
      console.error('STK Push error:', error);
      throw new AppError('Failed to initiate payment', 500);
    }
  }

  async handleCallback(callbackData: any) {
    const { Body } = callbackData;
    
    if (Body.stkCallback.ResultCode === 0) {
      // Payment successful
      const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;
      
      const mpesaReceipt = CallbackMetadata.Item.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value;
      const amount = CallbackMetadata.Item.find((item: any) => item.Name === 'Amount')?.Value;
      const transactionDate = CallbackMetadata.Item.find((item: any) => item.Name === 'TransactionDate')?.Value;
      
      // Update payment record
      const payment = await prisma.payment.update({
        where: { checkoutRequestID: CheckoutRequestID },
        data: {
          status: 'COMPLETED',
          mpesaReceipt,
          resultCode: ResultCode,
          resultDesc: ResultDesc,
          updatedAt: new Date()
        }
      });
      
      // Update order status
      await prisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'CONFIRMED' }
      });
      
      // Create notification for restaurant
      await prisma.notification.create({
        data: {
          userId: (await prisma.order.findUnique({ where: { id: payment.orderId } }))!.userId,
          title: 'Payment Successful',
          message: `Your payment of KES ${amount} for order has been confirmed`,
          type: 'order'
        }
      });
      
      return { success: true, paymentId: payment.id };
    } else {
      // Payment failed
      const { CheckoutRequestID, ResultCode, ResultDesc } = Body.stkCallback;
      
      await prisma.payment.update({
        where: { checkoutRequestID: CheckoutRequestID },
        data: {
          status: 'FAILED',
          resultCode: ResultCode,
          resultDesc: ResultDesc
        }
      });
      
      return { success: false, message: ResultDesc };
    }
  }

  private getTimestamp(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}