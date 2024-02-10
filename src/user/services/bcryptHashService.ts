import bcrypt from 'bcrypt';
import { HashService } from './hashService';

export class BcryptHashService implements HashService {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, hashedPassword);
    }
}
