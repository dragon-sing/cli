const ora = require('ora');
const chalk = require('chalk');
const spinner = ora('正在查询').start();

spinner.color = 'yellow';
// spinner.text = '123';

setTimeout(() => {
  // spinner.succeed('查询成功');
  spinner.fail(chalk.red('下载失败了'));
  // spinner.info('下载失败了');
}, 2000)
