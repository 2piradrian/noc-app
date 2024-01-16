import 'dotenv/config';

export const env = {
    PORT: process.env.PORT || 3000,
    MAILER_EMAIL: process.env.MAILER_EMAIL,
    MAILER_KEY: process.env.MAILER_KEY,
    MAILER_SERVICE: process.env.MAILER_SERVICE,
}