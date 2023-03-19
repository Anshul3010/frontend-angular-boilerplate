import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModule } from '../auth.module';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post('http://localhost:3001/v1/api/login', data);
  }

  register(data: any) {
    return this.http.post('http://localhost:3001/v1/api/register', data);
  }


  validateOTP(data: any) {
    return this.http.post('http://localhost:3001/v1/api/validate-otp', data);
  }

  forgotPassword(email: string) {
    return this.http.get(`http://localhost:3001/v1/api/forgot-password/${email}`);
  }

  resetPassword(hashedData: any, data: any) {
    return this.http.post(`http://localhost:3001/v1/api/reset-password/${hashedData}`, data);
  }

  resendOTP(email: string) {
    return this.http.get(`http://localhost:3001/v1/api/resend-otp/${email}`);
  }
}
