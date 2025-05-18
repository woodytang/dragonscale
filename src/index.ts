#!/usr/bin/env bun

import { Command } from "commander";
import { initCommand } from "./commands/init";
import { CLI_NAME, DESCRIPTION, VERSION } from "./utils/constants";
import { genCommand } from "./commands/gen";

const program = new Command();


program
  .name(CLI_NAME)
  .description(DESCRIPTION)
  .version(VERSION);

initCommand(program);
genCommand(program);

program.addHelpText('after', `
示例:
  $ dragonscale init              # 初始化新项目
  $ dragonscale list-templates    # 查看可用模板
  $ dragonscale version          # 查看版本号
  $ dragonscale --help           # 显示帮助信息
  `);


// 如果没有命令参数，显示帮助
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(0);
}

program.parse(process.argv);


