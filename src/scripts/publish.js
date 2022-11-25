const { exec} = require('shelljs');

console.log('1. start publish new version');

console.log('2. compiling....');

exec('npm run compile')

exec('git add .')
exec('git commit --amend --no-edit')

exec('npm version patch')

console.log('3. publishing...');

exec('npm publish --tag beta');