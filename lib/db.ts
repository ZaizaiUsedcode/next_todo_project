import { PrismaClient } from "@prisma/client";

//创建prisma实例
const globalFromPrisma = globalThis as unknown as {prisma?: PrismaClient};

//复用已存在实例，不存在就创建一个
export const prisma = globalFromPrisma.prisma ?? new PrismaClient({log:['error','warn']});

//在开发模式下，把实例挂到global
if (process.env.NODE_ENV !=='production'){
    globalFromPrisma.prisma = prisma;
}
