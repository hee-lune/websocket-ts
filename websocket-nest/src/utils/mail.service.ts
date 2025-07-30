import * as nodemailer from 'nodemailer';

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // TODO: Replace with actual email service provider configuration
      host: 'smtp.example.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'user@example.com',
        pass: 'password',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: '"Your Name" <noreply@example.com>',
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
