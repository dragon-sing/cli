const ora = require("ora");

// 工具方法：添加loading
export const addLoading = function (fn) {
  return async function (...args) {
    const spinner = ora("正在查询").start();
    const ret = await fn(...args);
    spinner.succeed("查询成功！");
    return ret;
  };
};
