// src/auth/infrastructure/helpers/EmailService.ts
import { IEmailService } from '../../aplication/Services/IEmailService';
import { Resend } from 'resend';

export class EmailService implements IEmailService {
    private resend: Resend;

    constructor() {
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    async sendLoginNotification(email: string, subject: string, message: string): Promise<void> {
        try {
            await this.resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: email,
                subject: subject,
                text: message,
            });
            console.log('Login notification email sent');
        } catch (error) {
            console.error('Error sending email', error);
        }
    }
}
