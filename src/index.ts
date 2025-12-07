import { PrismaClient } from "./persistence/generated/prisma/index.js";
import { createServer } from "./server/server.js";


const db = createPrismaClient();
createServer(db);

function createPrismaClient() {
    return new PrismaClient();
}
