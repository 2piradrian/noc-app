import { CheckServiceMulti } from "../domain/use-cases/checks/check-service-multi";
import { FileSystemDataSource } from "../infrastructure/data-sources/file-system";
import { MongoDataSource } from "../infrastructure/data-sources/mongo-log";
import { PostgresDataSource } from "../infrastructure/data-sources/postgres-log";
import { LogRepositoryImplentation } from "../infrastructure/repositories/log";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const postgreLogRepository = new LogRepositoryImplentation(new PostgresDataSource());
const mongoLogRepository = new LogRepositoryImplentation(new MongoDataSource());
const fileSystemLogRepository = new LogRepositoryImplentation(new FileSystemDataSource());

const emailService = new EmailService();

export class Server {
	public static start() {
		console.log("Server started"); 

		CronService.createJob("*/15 * * * * *", () => {
		 const url = "https://www.google.com";
			new CheckServiceMulti(
				[postgreLogRepository, mongoLogRepository, fileSystemLogRepository],
				undefined,  // No implementado para no tener tanto ruido
				undefined, 	// No implementado para no tener tanto ruido
			).execute(url);
		});
	}
}
