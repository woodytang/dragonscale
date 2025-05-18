# DragonScale (龍鳞)

![DragonScale Banner](https://img.shields.io/badge/DragonScale-CLI-FF1493)
![Version](https://img.shields.io/badge/version-0.0.8-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> 一个可定制的全栈单体仓库脚手架工具，自由集成您喜欢的开源技术。

## 简介

DragonScale 是一个强大的 CLI 工具，用于生成全栈单体仓库（monorepo）脚手架。它允许您快速创建一个包含前端和后端的项目结构，并自由选择集成不同的技术栈。

## 特点

- 🚀 快速创建全栈单体仓库结构
- 🔄 支持多种前端框架（Next.js, Taro 等）
- 🛠️ 支持多种后端框架（Hono 等）
- 📦 自动设置共享类型和依赖管理
- 🧩 提供代码片段生成功能
- ⚡ 基于 Bun 运行时，性能卓越

## 安装

### 全局安装

```bash
npm install -g dragonscale
```

### 开发环境安装

```bash
# 克隆仓库
git clone <repository-url>
cd dragonscale-bun

# 安装依赖
bun install

# 开发模式运行
bun run dev
```

## 使用方法

### 初始化新项目

```bash
dragonscale init
```

按照提示选择项目名称和要包含的技术栈（Next.js, Taro, Hono 等）。

### 生成代码片段

```bash
dragonscale gen nextjs form [filename]
```

这将在当前目录生成一个 Next.js 表单组件。

## 命令

- `dragonscale init` - 初始化新项目
- `dragonscale gen nextjs <type> [filename]` - 生成 Next.js 代码片段
- `dragonscale --help` - 显示帮助信息
- `dragonscale --version` - 显示版本信息

## 项目结构

初始化后的项目结构如下：

```
├── packages/
│   └── shared-types/  # 共享类型定义
├── client/           # 前端应用
│   └── nextjs/       # Next.js 应用（如果选择）
├── backend/          # 后端服务
│   └── hono/         # Hono 服务（如果选择）
├── package.json      # 根 package.json
├── pnpm-workspace.yaml  # PNPM 工作区配置
└── .npmrc           # NPM 配置
```

## 开发

```bash
# 开发模式
bun run dev

# 构建
bun run build

# 全局安装本地开发版本
bun run big
```

## 贡献

欢迎提交 Pull Requests 和 Issues！

## 许可证

MIT

---

本项目使用 [Bun](https://bun.sh) 创建，Bun 是一个快速的全能 JavaScript 运行时。
