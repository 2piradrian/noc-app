import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/data-sources/file-system";
import { LogRepositoryImplentation } from "../infrastructure/repositories/log";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImplentation(
	new FileSystemDataSource()
);

const emailService = new EmailService();

export class Server {
	public static start() {
		console.log("Server started");

		new SendEmailLogs(emailService, fileSystemLogRepository).execute(["email.test@gmail.com"]);

		//CronService.createJob("*/45 * * * * *", () => {
		// const url = "https://www.google.com";
		//	new CheckService(
		//		fileSystemLogRepository,
		//		undefined,  // No implementado para no tener tanto ruido
		//		undefined, 	// No implementado para no tener tanto ruido
		//	).execute(url);
		//});
	}
}
