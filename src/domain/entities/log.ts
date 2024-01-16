export enum LogSeverityLevel {
    ALL = 'ALL',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

interface LogOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogOptions) {
        const {level, message, origin, createdAt = new Date()} = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = createdAt;
    }

    static fromJSON = (json: string): LogEntity => {
        const {message, level, createdAt, origin} = JSON.parse(json);

        const log = new LogEntity({
            message: message, 
            level: level,
            createdAt: createdAt, 
            origin: origin
        });

        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const {message, level, createdAt, origin} = object;

        const log = new LogEntity({
            message: message, 
            level: level,
            createdAt: createdAt, 
            origin: origin
        });

        return log;
    }
}