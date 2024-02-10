export interface HashService {
    hashPassword(password: string): Promise<string>;
    comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean>;
}