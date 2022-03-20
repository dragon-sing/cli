#! /usr/bin/env node
const chalk = require("chalk");

// 文字颜色
console.log(chalk.red("红色文字"));
console.log(chalk.keyword('red')('内容'));
console.log(chalk.hex('#fff')('白色的文字'));


// 背景颜色
console.log(chalk.bgGreen('背景'));
console.log(chalk.green.bold`
  {red 从前慢}
  没有前端开发
`);

