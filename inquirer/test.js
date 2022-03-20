const inquirer = require('inquirer');

// 定义问题
const queList = [
  {
    type: 'checkbox',
    name: 'feature',
    message: '选择基础安装',
    pageSize: 2,
    choices: ['cba', 'nba', 'mba', 'abc', 'knb', 'durant']
  },
  {
    type: 'confirm',
    name: 'isLoad',
    message: '是否执行下载'
  }, {
    type: 'list',
    name: 'method',
    message: '选择下载方式',
    choices: ['npm', 'yarn', 'cnpm'],
    when(preAn) {
      return preAn.isLoad;
    }
  }
]

// 使用inquirer 来处理问题
inquirer.prompt(queList).then((answer) => {
  console.log(answer);
})

