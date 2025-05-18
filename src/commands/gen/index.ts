import { Command } from "commander";
import chalk from "chalk";
import path from "path";
import { generateFile } from "../../utils/file";
import fs from 'fs-extra';


// 判断是否是开发环境
const isDev = import.meta.dir.includes('/src/');

// 根据环境选择正确的路径
const snippetsDir = isDev
    ? path.join(import.meta.dir, '../../../snippets')  // 开发环境：往上找到项目根目录
    : path.join(import.meta.dir, 'snippets');         // 构建环境：直接在 dist 目录下

const nextjsDir = path.join(snippetsDir, 'nextjs');
// 获取当前工作目录
const currentDir = process.cwd();


export function genCommand(program: Command) {
    const gen = program
        .command('gen')

    gen.command('nextjs <type>')
        .description('生成 Next.js 代码片段')
        .argument('[filename]', '可选的文件名 (例如:form.tsx)')  // 添加可选参数，默认值为 form.tsx
        .action(async (type: string, filename: string) => {
            if (type === 'form') {
                const fileName = filename ?? "form.tsx";
                const filePath = path.join(currentDir, fileName);
                await generateFile(filePath, await parseTpl(type));
            } else {
                console.log(chalk.red(`不支持的代码片段类型: ${type}`));
                process.exit(1);
            }
        });

}


async function parseTpl(type: string) {
    const templatePath = path.join(nextjsDir, `${type}.template.tsx`);
    const content = await fs.readFile(templatePath, 'utf-8');

    // 移除 @ts-nocheck 注释
    return content.replace(/\/\/ @ts-nocheck\n/, '');
}