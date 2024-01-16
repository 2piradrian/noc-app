import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/data-sources/file-system";
import { MongoLogDataSource } from "../infrastructure/data-sources/mongo-log";
import { LogRepositoryImplentation } from "../infrastructure/repositories/log";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logRepository = new LogRepositoryImplentation(
	//new FileSystemDataSource()
	new MongoLogDataSource()
);

const emailService = new EmailService();

export class Server {
	public static start() {
		console.log("Server started"); 

		new SendEmailLogs(emailService, logRepository).execute(["email.test@gmail.com"]);

		//CronService.createJob("*/15 * * * * *", () => {
		// const url = "https://www.google.com";
		//	new CheckService(
		//		logRepository,
		//		undefined,  // No implementado para no tener tanto ruido
		//		undefined, 	// No implementado para no tener tanto ruido
		//	).execute(url);
		//});
	}
}
