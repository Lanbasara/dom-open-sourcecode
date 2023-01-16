const { exec, env } = require("shelljs");

const versionTitle = process.argv.slice(2)[0].match(/--(\w+)/)[1];

console.log("1. start publish new version");

console.log("2. compiling....");

exec("npm run compile");

exec(`npm version ${versionTitle}`);

console.log("3. publishing...");

exec("npm publish");

const npm_package_version = env["npm_package_version"];

console.log(`version tag is ${npm_package_version}`);

console.log("4. git tag");

exec(`git tag v${npm_package_version}`);
