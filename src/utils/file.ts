import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

export async function generateFile(filePath: string, content: string) {
    try {
        // 获取完整的文件路径
        const absolutePath = path.resolve(process.cwd(), filePath);

        // 确保目标目录存在
        await fs.ensureDir(path.dirname(absolutePath));

        // 检查文件是否已存在
        if (await fs.pathExists(absolutePath)) {
            console.log(chalk.yellow(`文件已存在: ${filePath}`));
            console.log(chalk.yellow('请选择其他名称或删除现有文件。'));
            process.exit(1);
        }

        // 写入文件
        await fs.writeFile(absolutePath, content);
        console.log(chalk.green(`✓ 成功生成文件: ${filePath}`));

        return absolutePath;
    } catch (error) {
        console.error(chalk.red('生成文件时出错:'), error);
        process.exit(1);
    }
}