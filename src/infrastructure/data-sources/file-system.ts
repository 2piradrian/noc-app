import fs from 'fs';

import { LogEntity, LogSeverityLevel } from "../../domain/entities/log";
import { LogDataSource } from "../../domain/data-sources/log";

export class FileSystemDataSource implements LogDataSource {

    private readonly logPath: string = "logs/";

    private readonly allLogsPath: string    = "logs/logs-all.log";
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

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf8');
        const logs = content.split("\n").map(LogEntity.fromJSON); // Forma abreviada de map

        return logs;
    };

    async saveLog(log: LogEntity): Promise<void> {
        const logAsJSON = `${JSON.stringify(log)}\n`;

        fs.appendFileSync(this.allLogsPath, logAsJSON);

        switch (log.level) {
            case LogSeverityLevel.MEDIUM:
                fs.appendFileSync(this.mediumLogsPath, logAsJSON);
                break;
            case LogSeverityLevel.HIGH:
                fs.appendFileSync(this.highLogsPath, logAsJSON);
                break;
            default:
                break;
        }
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.ALL:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.HIGH:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error("Invalid severity level: " + severityLevel);
        }
    }
  
}