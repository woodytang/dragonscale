import path from "path";
import fs from "fs-extra";
import type { TemplateOptions } from "./copy-templates";


export async function createNecessaryFiles(projectPath: string, answers: TemplateOptions) {
    // 创建 package.json
    await createRootPackageJson(projectPath, answers);
    // 创建 .npmrc 文件
    const npmrcPath = path.join(projectPath, ".npmrc");
    await fs.writeFile(npmrcPath, "strict-peer-dependencies=false\n");

    // 创建 .gitignore 文件
    const gitignorePath = path.join(projectPath, ".gitignore");
    await fs.writeFile(gitignorePath, "node_modules\n");

    // 创建 pnpm-workspace.yaml
    const pnpmWorkspacePath = path.join(projectPath, "pnpm-workspace.yaml");
    await fs.writeFile(
        pnpmWorkspacePath,
        "packages:\n  - packages/*\n  - client/*\n  - backend/*\n"
    );
}


async function createRootPackageJson(
    projectPath: string,
    answers: TemplateOptions
) {
    const packageJson = {
        name: path.basename(projectPath),
        private: true,
        workspaces: ["packages/*", "client/*", "backend/*"],
        scripts: {} as Record<string, string>,
    };

    if (answers.includeNextjs) {
        packageJson.scripts["dev:next"] = "cd client/nextjs && pnpm run dev";
    }

    if (answers.includeHono) {
        packageJson.scripts["dev:hono"] = "cd backend/hono && pnpm run dev";
    }

    await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
        spaces: 2,
    });
}