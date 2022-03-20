//! 导入具体的命令执行回调
const { createAction } = require('./actions')

const myCommander = (program) => {
  program
    .command("create <project> [others...]")
    .alias("crt")
    .description("create new project")
    .action(createAction);

  
}

module.exports = myCommander;
