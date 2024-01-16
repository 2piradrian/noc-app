import 'dotenv/config';

export const env = {
    PORT:           process.env.PORT            || 3000,
    MAILER_EMAIL:   process.env.MAILER_EMAIL,
    MAILER_KEY:     process.env.MAILER_KEY,
    MAILER_SERVICE: process.env.MAILER_SERVICE,

    // MongoDB
    MONGO_URL:      process.env.MONGO_URL       || "",
    MONGO_DB_NAME:  process.env.MONGO_DB_NAME   || "",
    MONGO_USER:     process.env.MONGO_USER      || "",
    MONGO_PASS:     process.env.MONGO_PASS      || "",
}