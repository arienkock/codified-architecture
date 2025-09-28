import { PrismaClient, Prisma } from "./generated/prisma"

import { UserInputSchema } from "./generated/zod/schemas";

const prisma = new PrismaClient()

console.log(UserInputSchema.parse({
    email: "asd",
    hashedPassword: "asd"
}))

prisma.user.create
