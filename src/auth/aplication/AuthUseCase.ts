import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/authRepository";
import { IEcryptService } from "./Services/IEncryptService";
import { IJwtService } from "./Services/IJwtService";
import { IEmailService } from "./Services/IEmailService";

export class AuthUseCase {
  constructor(
    readonly authRepository: AuthRepository,
    readonly encryptPassword: IEcryptService,
    readonly jwtService: IJwtService,
    readonly emailService: IEmailService
  ) {}

  async login(email: string, password: string): Promise<string | null> {
    try {
      const user = await this.authRepository.findByEmail(email);
      if (user) {
        const isPasswordCorrect = await this.encryptPassword.authPassword(password, user.password);
        if (isPasswordCorrect) {
          const token = this.jwtService.generateToken({ email: user.email, name: user.name });
          
          // Enviar correo electrónico de notificación
          await this.emailService.sendLoginNotification(
            email,
            'Inicio de sesión exitoso',
            'Has iniciado sesión correctamente.'
          );

          console.log(token)
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
      const encode = await this.encryptPassword.encodePassword(password);
      const user = new Auth(0, name, email, encode);
      await this.authRepository.save(user);
    } catch (error) {
      console.error('Error in AuthUseCase register', error);
      throw error;
    }
  }
}
