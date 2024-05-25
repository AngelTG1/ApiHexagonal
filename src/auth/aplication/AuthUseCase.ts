import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/authRepository";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class AuthUseCase {
    constructor(private readonly authRepository: AuthRepository) {}
  
    async login(email: string, password: string): Promise<string | null> {
      try {
        const user = await this.authRepository.findByEmail(email);
        if (user) {
          const isPasswordCorrect = await bcrypt.compare(password, user.password);
          if (isPasswordCorrect) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            return token;
          }
        }
        return null;
      } catch (error) {
        console.error('Error in AuthUseCase login', error);
        return null;
      }
    }
  
    async register(name: string, email: string, password: string): Promise<void> {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Auth(0, name, email, hashedPassword);
        await this.authRepository.save(user);
      } catch (error) {
        console.error('Error in AuthUseCase register', error);
        throw error;
      }
    }
  }
