import dotenv from 'dotenv';
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000'),
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_EXPIRES_IN: '7d',
  JWT_REFRESH_EXPIRES_IN: '30d',
  MPESA_CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY!,
  MPESA_CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET!,
  MPESA_PASSKEY: process.env.MPESA_PASSKEY!,
  MPESA_SHORTCODE: process.env.MPESA_SHORTCODE!,
  MPESA_ENVIRONMENT: process.env.MPESA_ENVIRONMENT || 'sandbox',
  MPESA_CALLBACK_URL: process.env.MPESA_CALLBACK_URL!,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: 100,
};

Object.entries(config).forEach(([key, value]) => {
  if (!value && key !== 'REDIS_URL') {
    throw new Error(`Missing environment variable: ${key}`);
  }
});
