export enum LogSeverityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(message: string, level: LogSeverityLevel) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }

    static fromJSON = (json: string): LogEntity => {
        const {message, level, createdAt} = JSON.parse(json);
        const log = new LogEntity(message, level);
        log.createdAt = new Date(createdAt); // Para que la fecha sea cuando se escribió el log

        return log;
    }
}