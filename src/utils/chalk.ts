import chalk from "chalk";
export const log = console.log;
export const error = chalk.bold.red;
export const _warning = chalk.keyword("orange");
export const cyan = chalk.keyword("blue");
export const warning = (...data: any[]) => log(`[WARN]: ${_warning(...data)} `);
export const info = (...data: any[]) => log(`[INFO]: ${chalk.cyan(...data)} `);
export const _error = (...data: any[]) => log(`[ERROR]: ${chalk.red(...data)} `);
export const debbug = (...data: any[]) => log(`[DEBUG]: ${chalk.green(...data)} `);


