// src/events/application/Services/IEmailService.ts
export interface IEmailService {
    sendEventNotification(email: string, subject: string, message: string): Promise<void>;
}
