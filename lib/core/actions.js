const axios = require('axios');

const createAction = async (project) => {
  console.log('create命令执行了', '---', project);
  // 查询信息
  let res = await axios('https://api.gihub.com/user/dragon-sing/repos');
  console.log(res);
}

module.exports = {
  createAction
}
