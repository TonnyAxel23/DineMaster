// src/shared/utils/ApiResponse.ts
export class ApiResponse<T = any> {
  public success: boolean;
  public data?: T;
  public message?: string;
  public error?: string;
  public statusCode: number;

  constructor(statusCode: number, data?: T, message?: string, error?: string) {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static success<T>(data: T, message = 'Success', statusCode = 200): ApiResponse<T> {
    return new ApiResponse<T>(statusCode, data, message);
  }

  static error(message: string, statusCode = 400, error?: string): ApiResponse {
    return new ApiResponse(statusCode, undefined, message, error);
  }
}