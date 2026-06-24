// src/modules/auth/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../shared/utils/ApiResponse';
import { AppError } from '../../shared/middleware/errorHandler';

const authService = AuthService.getInstance();

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, firstName, lastName, phoneNumber } = req.body;
      
      const result = await authService.register(
        email, password, firstName, lastName, phoneNumber
      );
      
      res.status(201).json(
        ApiResponse.success(result, 'Registration successful')
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      
      const result = await authService.login(email, password);
      
      res.status(200).json(
        ApiResponse.success(result, 'Login successful')
      );
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        throw new AppError('Refresh token required', 400);
      }
      
      const tokens = await authService.refreshToken(refreshToken);
      
      res.status(200).json(
        ApiResponse.success(tokens, 'Token refreshed')
      );
    } catch (error) {
      next(error);
    }
  }
}