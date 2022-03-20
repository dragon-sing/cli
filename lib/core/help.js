const helpOptions = (program) => {
  // 新增自定义的可选属性
  program.option("-f --framework <framework>", "select your framework");
  program.option("-d --dest <dest>", "a folder");
  // 帮助信息
  const examples = {
    create: ["ali create|crt <project>"],
    config: ["ali config|cfg set <k> <v>", "ali config|cfg get <k>"],
  };
  // 处理帮助信息
  program.on("--help", () => {
    console.log("Examples:");
    Object.keys(examples).forEach((actionName) => {
      examples[actionName].forEach((item) => {
        console.log("  " + item);
      });
    });
  });
}

module.exports = helpOptions
