export interface IEmailService {
    sendLoginNotification(email: string, subject: string, message: string): Promise<void>;
}
