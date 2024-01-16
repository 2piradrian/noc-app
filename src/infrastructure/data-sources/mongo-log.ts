import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/data-sources/log";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log";

export class MongoLogDataSource implements LogDataSource{
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);

        console.log(newLog);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel,
        });

        return logs.map(LogEntity.fromObject);
    }
}