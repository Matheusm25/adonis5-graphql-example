const fs = require('fs');
const path = require('path');

export function getFilesFromDirectory(basePath) {
  const files = fs.readdirSync(basePath);
  return files
    .filter(file => fs.lstatSync(`${basePath}/${file}`).isFile())
    .map(file => path.parse(`${basePath}/${file}`).name);
}

export function exists(path) {
  return fs.existsSync(path);
}

export function read(path) {
  return fs.readFileSync(path);
}
