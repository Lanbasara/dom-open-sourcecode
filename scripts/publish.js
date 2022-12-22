const { exec } = require('shelljs');

const updateType =  process.argv.splice(2);


console.log('1. start publish new version');

console.log('2. compiling....');

exec('npm run compile')

exec(`npm version ${updateType[1]}`)

console.log('3. publishing...');

exec('npm publish');