const { exec} = require('shelljs');

console.log('1. start publish new version');

console.log('2. compiling....');

exec('npm run compile')

exec('npm version minor')

console.log('3. publishing...');

exec('npm publish');