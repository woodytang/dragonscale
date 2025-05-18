import { spawn } from "child_process";
import chalk from "chalk";
import path from "path";


export async function generatePrismaClient(projectPath: string): Promise<void> {
    const prismaPath = path.join(projectPath, "backend/hono");
    console.log(chalk.blue("正在生成 Prisma 客户端..."));

    return new Promise<void>((resolve, reject) => {
        const prismaGenerate = spawn("npx", ["prisma", "generate"], {
            cwd: prismaPath,
            stdio: "inherit",
        });

        prismaGenerate.on("close", (code) => {
            if (code === 0) {
                console.log(chalk.green("Prisma 客户端生成成功!"));
                resolve();
            } else {
                console.error(chalk.red("Prisma 客户端生成失败: 退出码 " + code));
                reject(new Error("Prisma 客户端生成失败"));
            }
        });
    });
}