import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDataSource } from "../../domain/data-sources/log";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log";

const prismaClient = new PrismaClient();

const severityEnum = {
    LOW: SeverityLevel.LOW,
    MEDIUM: SeverityLevel.MEDIUM,
    HIGH: SeverityLevel.HIGH,
}

export class PostgresDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: severityEnum[log.level],
            }
        
        });
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: severityEnum[severityLevel]
            }
        });

        return logs.map(LogEntity.fromObject);
    }
}