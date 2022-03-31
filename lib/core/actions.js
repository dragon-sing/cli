const axios = require('axios');
const ora = require("ora");
const inquirer = require("inquirer");
const { promisify } = require('util')
const path = require('path')
const fs = require('fs')
let downloadFn = require('download-git-repo');

downloadFn = promisify(downloadFn);

function toUnixPath(path) {
  return path.replace(/\\/g, "/");
}
// 工具方法：查询操作
const fetchInfo = async (repoName, TplName) => {
  // 写死的token
  const token = "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";
  const url1 = `https://api.github.com/users/${repoName}/repos`;
  const url2 = `https://api.github.com/repos/${repoName}/${TplName}/tags`;
  const url = !TplName ? url1 : url2;
  const headers = {
    "Authorization" : "token " + token
  }
  let { data } = await axios({
    headers,
    url,
    method: "get",
  });
  return data.map(item => item.name)
}

// 工具方法：添加loading
const addLoading = function (fn) {
  return async function (...args) {
    const spinner = ora('正在查询').start();
    const ret = await fn(...args);
    spinner.succeed('查询成功！')
    return ret;
  }
}

const downLoadRepo = async (repo, tag) => {
  const cacheDir = toUnixPath(
    `${process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"]}` +
      "/.tmp"
  );
  let api = `dragon-sing/${repo}`;
  if (tag) api += `#/${tag}`;
  console.log(api);
  console.log(cacheDir);

  const dest = tag ? path.resolve(cacheDir, repo, tag) : path.resolve(cacheDir, repo);
  console.log(dest, 'dest');

  if (!fs.existsSync(dest)) {
    const spinner = ora("正在下载").start();
    await downloadFn(api, dest); // 将api 下载到dest
    spinner.succeed("下载成功");
  }


  return dest;

}

const createAction = async (project) => {
  // 查询仓库信息
  const repos = await addLoading(fetchInfo)("dragon-sing");
  console.log(repos);

  // 提供仓库模板选项
  const queList = [
    {
      type: "list",
      name: "tmpRepo",
      message: "选择目标模板",
      choices: repos,
    },
  ];
  const { tmpRepo } = await inquirer.prompt(queList);
  // console.log(tplName);
  const tags = await addLoading(fetchInfo)("dragon-sing", tmpRepo);

  if (tags.length) {
    // 此时就说明当前存在多个版本
    const quesTag = [
      {
        type: "list",
        name: "tmpTag",
        message: "选择指定的版本",
        choices: tags,
      },
    ];
    const { tmpTag } = await inquirer.prompt(quesTag);
    downLoadRepo(tmpRepo, tmpTag);
  } else {
    // 只有一个版本，我们直接执行下载操作
    console.log('直接下载......');
    downLoadRepo(tmpRepo);
  }
}

module.exports = {
  createAction
}
