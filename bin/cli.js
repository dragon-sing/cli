#! /usr/bin/env node
const { program } = require('commander');
const helpOptions = require('../lib/core/help')
const myCommander = require('../lib/core/myCommand')

// 提示信息
helpOptions(program);

// 自定义命令
myCommander(program);

program.version(require('../package.json').version).parse(process.argv);

