import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/data-sources/file-system";
import { LogRepositoryImplentation } from "../infrastructure/repositories/log";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImplentation(
	new FileSystemDataSource()
);

export class Server {
	public static start() {
		const url = "https://www.google.com";

		console.log("Server started");

		CronService.createJob("*/45 * * * * *", () => {
			new CheckService(
				fileSystemLogRepository,
				undefined,  // No implementado para no tener tanto ruido
				undefined, 	// No implementado para no tener tanto ruido
			).execute(url);
		});
	}
}
