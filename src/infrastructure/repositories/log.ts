import { LogDataSource } from "../../domain/data-sources/log";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log";
import { LogRepository } from "../../domain/repository/log";

export class LogRepositoryImplentation implements LogRepository {

  constructor(
    private readonly logDataSource: LogDataSource // BBDD, API, etc
  ) {}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel);
    }

}