const { exec } = require('shelljs')
const npm_package_version = env['npm_package_version'];

console.log('tag version is',`v${npm_package_version}`)

exec(`git tag v${npm_package_version}`)

exec(`git push origin v${npm_package_version}`)
