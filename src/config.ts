export const DEFAULT_PAGE_SIZE = 10;
export const JWT_SECRET = process.env.JWT_SECRET || '7TGHi876tfG&^%$#EWSdcvgU&65RFGHJITRFcvbnji87tr';
export const RATE_LIMIT_THRESHOLD = process.env.RATE_LIMIT_THRESHOLD ? Number(process.env.RATE_LIMIT_THRESHOLD) : 100;