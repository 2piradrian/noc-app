import nodemailer from "nodemailer";
import { env } from "../../config/plugins/env";
import { LogRepository } from "../../domain/repository/log";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log";

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: env.MAILER_SERVICE,
        auth: {
            user: env.MAILER_EMAIL,
            pass: env.MAILER_KEY
        }
    });

    constructor(
    ){}

    async sendEmail(options: SendMailOptions): Promise<boolean>{
        const {to, subject, htmlBody, attachments = []} = options;

        try{
            const sentInfo = await this.transporter.sendMail({
                from: env.MAILER_EMAIL,
                to,
                subject,
                html: htmlBody,
                attachments: attachments
            });

            const log = new LogEntity({
                level: LogSeverityLevel.MEDIUM,
                message: `Email sent to ${to}`,
                origin: "email-service.ts",
            })

            return true;
        }
        catch(error){

            const log = new LogEntity({
                level: LogSeverityLevel.MEDIUM,
                message: `Email not sent to ${to}`,
                origin: "email-service.ts",
            })

            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]){
        const subject = "Logs del servidor";
        const htmlBody = `
            <h1>Logs del servidor</h1>
            <p>Resumen de eventos del servidor</p>
        `
        const attachments: Attachment[] = [
            {
                filename: "logs-all.log",
                path: "./logs/logs-all.log"
            },
            {
                filename: "logs-medium.log",
                path: "./logs/logs-medium.log"
            },
            {
                filename: "logs-high.log",
                path: "./logs/logs-high.log"
            },
        ];
        return this.sendEmail({to, subject, htmlBody, attachments});
    }
}