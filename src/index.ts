import { PrismaClient } from "./persistence/generated/prisma/index.js";
import { createServer } from "./server/server.js";


const db = createPrismaClient();
const server = createServer(db);

function createPrismaClient() {
    console.log("Creating Prisma client");
    return new PrismaClient();
}

function gracefulShutdown(signal: string) {
    console.log(`Received ${signal}, shutting down gracefully...`);
    
    // Set a timeout to force shutdown if it takes too long
    const shutdownTimeout = setTimeout(() => {
        console.error("Forcing shutdown after timeout");
        process.exit(1);
    }, 10000); // 10 second timeout

    // Close all connections immediately (Node.js 18.2.0+)
    if (typeof server.closeAllConnections === 'function') {
        server.closeAllConnections();
    }

    server.close(() => {
        clearTimeout(shutdownTimeout);
        console.log("HTTP server closed");
        db.$disconnect()
            .then(() => {
                console.log("Database disconnected");
                process.exit(0);
            })
            .catch((err) => {
                console.error("Error disconnecting database:", err);
                process.exit(1);
            });
    });
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
