
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private failedLoginAttempts = new Map<string, number>();
  private isLocked = new Map<string, boolean>();

  async validateUser(email: string, pass: string): Promise<any> {
    if (this.isLocked.get(email)) {
      return { error: 'Account is locked' };
    }

    // Replace with actual user validation
    const user = { email: 'test@example.com', password: 'password' };

    if (user.password === pass) {
      this.failedLoginAttempts.set(email, 0);
      return user;
    } else {
      const attempts = (this.failedLoginAttempts.get(email) || 0) + 1;
      this.failedLoginAttempts.set(email, attempts);

      if (attempts >= 3) {
        this.isLocked.set(email, true);
        // Add a timer to unlock the account after a certain period
      }

      return null;
    }
  }

  async login(user: any) {
    // This will be implemented later with JWT
    return { access_token: 'jwt_token' };
  }

  async sendEmailVerification(email: string) {
    // Implement email verification logic here
    console.log(`Sending verification email to ${email}`);
  }
}
