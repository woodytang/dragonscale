import chalk from "chalk";

export const isUTF8Supported = process.env.LANG && process.env.LANG.includes("UTF-8");

export const BANNER = `
${chalk.red("╔═══╗")}${chalk.blue("─────────────")}${chalk.red("╔═══╗")}${chalk.blue("─────")}${chalk.red("╔╗")}
${chalk.red("╚╗╔╗║")}${chalk.blue("─────────────")}${chalk.red("║╔═╗║")}${chalk.blue("─────")}${chalk.red("║║")}
${chalk.blue("─")}${chalk.red("║║║╠═╦══╦══╦══╦═╗║╚══╦══╦══╣║╔══╗")}
${chalk.blue("─")}${chalk.red("║║║║╔╣╔╗║╔╗║╔╗║╔╗╬══╗║╔═╣╔╗║║║║═╣")}
${chalk.red("╔╝╚╝║║║╔╗║╚╝║╚╝║║║║╚═╝║╚═╣╔╗║╚╣║═╣")}
${chalk.red("╚═══╩╝╚╝╚╩═╗╠══╩╝╚╩═══╩══╩╝╚╩═╩══╝")}
${chalk.blue("─────────")}${chalk.red("╔═╝║")}
${chalk.blue("─────────")}${chalk.red("╚══╝")}
`;

export const intro = "A customizable full-stack monorepo, freely integrating your preferred open-source technologies.";