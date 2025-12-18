export type AppConfig = {
    DEFAULT_PAGE_SIZE: number;
    JWT_SECRET: string;
    RATE_LIMIT_THRESHOLD: number;
};

export const defaultConfig: AppConfig = {
    DEFAULT_PAGE_SIZE: 10,
    JWT_SECRET: process.env.JWT_SECRET || '7TGHi876tfG&^%$#EWSdcvgU&65RFGHJITRFcvbnji87tr',
    RATE_LIMIT_THRESHOLD: process.env.RATE_LIMIT_THRESHOLD ? Number(process.env.RATE_LIMIT_THRESHOLD) : 100,
};