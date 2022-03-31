// console.log(process.env);
console.log(process.platform);
console.log(process.env['HOME']);

function toUnixPath(path) {
  return path.replace(/\\/g, '/');
}

console.log(toUnixPath(`${process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']}` + '/.tmp'));
