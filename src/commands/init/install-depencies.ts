import { spawn } from "child_process";
import chalk from "chalk";

export async function installDependencies(projectPath: string): Promise<void> {
    console.log(chalk.blue("正在安装依赖..."));

    return new Promise<void>((resolve, reject) => {
        const pnpmInstall = spawn("pnpm", ["install", "--loglevel", "error"], {
            cwd: projectPath,
            stdio: "inherit",
        });

        pnpmInstall.on("close", (code) => {
            if (code === 0) {
                console.log(chalk.green("依赖安装成功!"));
                resolve();
            } else {
                console.error(chalk.red("依赖安装失败: 退出码 " + code));
                reject(new Error(`依赖安装失败: 退出码 ${code}`));
            }
        });

        pnpmInstall.on("error", (error) => {
            console.error(chalk.red("依赖安装失败:"), error);
            reject(error);
        });
    });
}