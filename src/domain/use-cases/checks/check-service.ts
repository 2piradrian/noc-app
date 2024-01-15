import { LogEntity, LogSeverityLevel } from "../../entities/log";
import { LogRepository } from "../../repository/log";

interface CheckServiceUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type FailureCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

	constructor(
		private readonly logRepository: LogRepository, // No la implementacion, ya que no sabemos como se va a guardar, solo que se va a guardar, por eso es una abstraccion
		private readonly successCallback: SuccessCallback,
		private readonly failureCallback: FailureCallback
	) {}

	async execute(url: string): Promise<boolean> {
		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`${url} is down`);
			}

			const log = new LogEntity(`${url} is up`, LogSeverityLevel.LOW);
			await this.logRepository.saveLog(log);

			this.successCallback && this.successCallback();
			return true;
		} catch (error) {
			const log = new LogEntity(`${url} is down`, LogSeverityLevel.HIGH);
			await this.logRepository.saveLog(log);

			this.failureCallback && this.failureCallback(`${error}`);
			return false;
		}
	}
}
