import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
	public static start() {
		const url = "https://www.google.com";

		console.log("Server started");

		CronService.createJob("*/45 * * * * *", () => {
			new CheckService(
				() => console.log("Success"),
				(error) => console.log(error)
			).execute(url);
		});
	}
}
