import fs from 'fs';
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log";
import { LogDataSource } from "../../domain/data-sources/log";

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath: string = "logs/";

    private readonly allLogsPath: string    = "logs/logs-low.log";
    private readonly mediumLogsPath: string = "logs/logs-medium.log";
    private readonly highLogsPath: string   = "logs/logs-high.log";

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath]
        .forEach((path) => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, "");
            }
        });
    };

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
  
}