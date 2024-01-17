import { LogEntity, LogSeverityLevel } from "../../entities/log";
import { LogRepository } from "../../repository/log";

interface CheckServiceMultiUseCase {
	execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type FailureCallback = ((error: string) => void) | undefined;

export class CheckServiceMulti implements CheckServiceMultiUseCase {

	constructor(
		private readonly logRepository: LogRepository[], // No la implementacion, ya que no sabemos como se va a guardar, solo que se va a guardar, por eso es una abstraccion
		private readonly successCallback: SuccessCallback,
		private readonly failureCallback: FailureCallback
	) {}

	private async callLogs(log: LogEntity) {
		this.logRepository.forEach(async (logRepository) => {
			await logRepository.saveLog(log);
		});
	}

	async execute(url: string): Promise<boolean> {
		try {
			const response = await fetch(url);

			if (!response.ok) {
				throw new Error(`${url} is down`);
			}

			const log = new LogEntity({
				message: `${url} is up`, 
				level: LogSeverityLevel.LOW,
				origin: 'check-service.ts'
			});
			this.callLogs(log);
			this.successCallback && this.successCallback();

			return true;
		} catch (error) {
			const log = new LogEntity({
				message: `${url} is down`, 
				level: LogSeverityLevel.HIGH,
				origin: 'check-service.ts'
			});
			await this.callLogs(log);
			this.failureCallback && this.failureCallback(`${error}`);
			
			return false;
		}
	}
}
