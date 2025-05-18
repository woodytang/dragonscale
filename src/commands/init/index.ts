import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import { BANNER, isUTF8Supported, intro } from "../../utils/banner.ts";
import { copyTemplateFiles } from "./copy-templates.ts";
import { createNecessaryFiles } from "./create-necessary-files.ts";
import { installDependencies } from "./install-depencies.ts";
import { generatePrismaClient } from "./generate-prisma-client.ts";
import fs from "fs-extra";

// 从 copy-templates.ts 中导入 findProjectRoot 函数
function findProjectRoot(currentDir: string): string {
    const packagePath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packagePath)) {
        return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
        return currentDir;
    }

    return findProjectRoot(parentDir);
}

export function initCommand(program: Command) {
    return program
        .command("init")
        .description("初始化一个新的 DragonScale 项目")
        .action(async () => {
            console.log(BANNER);
            console.log(
                chalk.bold.hex("#FF1493")(
                    isUTF8Supported ? "龍鳞: " + intro : "DragonScale: " + intro
                )
            );
            console.log(chalk.cyan(`Version: ${program.version()}`));

            const answers = await inquirer.prompt([
                {
                    type: "input",
                    name: "projectName",
                    message: "Enter project name:",
                    default: "my-ds-project",
                },
                {
                    type: "confirm",
                    name: "includeNextjs",
                    message: "Include Next.js frontend?",
                    default: true,
                },
                {
                    type: "confirm",
                    name: "includeTaro",
                    message: "Include Taro mobile frontend?",
                    default: true,
                },
                {
                    type: "confirm",
                    name: "includeHono",
                    message: "Include Hono backend?",
                    default: true,
                },
            ]);

            const projectPath = path.join(process.cwd(), answers.projectName);
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const projectRoot = findProjectRoot(__dirname);
            const templatePath = path.join(projectRoot, "templates");

            try {
                try {
                    console.log(chalk.blue('Copying template files...'));
                    await copyTemplateFiles(projectPath, answers);
                } catch (error: any) {
                    console.error(chalk.red('Error in copyTemplateFiles:'), {
                        message: error.message,
                        path: error.path,
                        code: error.code,
                        syscall: error.syscall,
                        stack: error.stack
                    });
                    throw error;
                }

                try {
                    console.log(chalk.blue('Creating necessary files...'));
                    await createNecessaryFiles(projectPath, answers);
                } catch (error: any) {
                    console.error(chalk.red('Error in createNecessaryFiles:'), {
                        message: error.message,
                        path: error.path,
                        code: error.code,
                        syscall: error.syscall,
                        stack: error.stack
                    });
                    throw error;
                }

                try {
                    console.log(chalk.blue('Installing dependencies...'));
                    await installDependencies(projectPath);
                } catch (error: any) {
                    console.error(chalk.red('Error in installDependencies:'), {
                        message: error.message,
                        path: error.path,
                        code: error.code,
                        syscall: error.syscall,
                        stack: error.stack
                    });
                    throw error;
                }

                try {
                    console.log(chalk.blue('Generating Prisma client...'));
                    await generatePrismaClient(projectPath);
                } catch (error: any) {
                    console.error(chalk.red('Error in generatePrismaClient:'), {
                        message: error.message,
                        path: error.path,
                        code: error.code,
                        syscall: error.syscall,
                        stack: error.stack
                    });
                    throw error;
                }

                console.log(
                    chalk.bold.hex("#FF1493")(
                        "Congratulations! Your Dragon is Breathing Fire Now!"
                    )
                );
            } catch (error) {
                if (error instanceof Error) {
                    console.error(chalk.red("Error creating project:"), {
                        message: error.message,
                        path: (error as any).path,
                        stack: error.stack
                    });
                } else {
                    console.error(chalk.red("Unknown error:"), error);
                }
                process.exit(1);
            }
        });
}