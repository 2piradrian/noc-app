import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log";
import { LogRepository } from "../../repository/log";

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepositoy: LogRepository
    ){}

   async execute (to: string | string[]) : Promise<boolean>{
        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!sent) {
                throw new Error("Email log not sent");
            }
            return true;
        }catch(error){
            const log = new LogEntity({
                level: LogSeverityLevel.MEDIUM,
                message: `Email not sent to ${to}`,
                origin: "email-service.ts",
            })
            this.logRepositoy.saveLog(log);
            return false;
        }

   }

}