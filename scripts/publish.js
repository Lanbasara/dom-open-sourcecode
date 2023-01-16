const { exec } = require("shelljs");

const versionTitle = process.argv.slice(2)[0].match(/--(\w+)/)[1];

console.log("1. start publish new version");

console.log("2. compiling....");

exec("npm run build");

exec(`npm version ${versionTitle}`);


// console.log("3. publishing...");

// exec("npm publish");
