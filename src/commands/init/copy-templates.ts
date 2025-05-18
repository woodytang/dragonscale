import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";

export interface TemplateOptions {
    includeNextjs: boolean;
    includeTaro: boolean;
    includeHono: boolean;
}

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

export async function copyTemplateFiles(
    projectPath: string,
    options: TemplateOptions
) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const projectRoot = findProjectRoot(__dirname);
    const templatePath = path.join(projectRoot, "templates");

    // Copy shared-types
    try {
        await fs.copy(
            path.join(templatePath, "shared-types"),
            path.join(projectPath, "packages/shared-types")
        );
    } catch (error: any) {
        console.error(chalk.red('Error copying shared-types:'), {
            message: error.message,
            path: error.path,
            code: error.code,
            syscall: error.syscall
        });
        throw error;
    }

    // Copy Next.js if selected
    if (options.includeNextjs) {
        try {
            await fs.copy(
                path.join(templatePath, "nextjs"),
                path.join(projectPath, "client/nextjs")
            );
        } catch (error: any) {
            console.error(chalk.red('Error copying Next.js template:'), {
                message: error.message,
                path: error.path,
                code: error.code,
                syscall: error.syscall
            });
            throw error;
        }
    }

    // Copy Taro if selected
    if (options.includeTaro) {
        try {
            await fs.copy(
                path.join(templatePath, "taro"),
                path.join(projectPath, "client/taro")
            );
        } catch (error: any) {
            console.error(chalk.red('Error copying Taro template:'), {
                message: error.message,
                path: error.path,
                code: error.code,
                syscall: error.syscall
            });
            throw error;
        }
    }

    // Copy Hono if selected
    if (options.includeHono) {
        try {
            await fs.copy(
                path.join(templatePath, "hono"),
                path.join(projectPath, "backend/hono")
            );
        } catch (error: any) {
            console.error(chalk.red('Error copying Hono template:'), {
                message: error.message,
                path: error.path,
                code: error.code,
                syscall: error.syscall
            });
            throw error;
        }
    }
}