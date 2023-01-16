const inquirer = require("inquirer");
const chalk = require("chalk");
const { exec } = require("shelljs");

const PUBLISH_TYPE = [
  { name: "preminor", value: "preminor" },
  { name: "premajor", value: "premajor" },
  { name: "patch", value: "patch" },
  { name: "minor", value: "minor" },
  { name: "major", value: "major" },
];

const questions = [
  {
    type: "list",
    name: "publish_type",
    message: "Choose publish type",
    default: "patch",
    choices: PUBLISH_TYPE,
  },
  {
    type: "confirm",
    name: "git_tag",
    message: "Create a git tag?",
    default: false,
  },
];

inquirer.prompt(questions).then((ans) => {
  const type = ans["publish_type"];

  const isGitTag = ans["git_tag"];

  console.log(console.log(chalk.blue("1. start publish new version")));

  console.log(chalk.blue("2. compiling...."));

  exec("npm run build");

  exec(`npm version ${type}`);

  console.log(chalk.blue("3. publishing..."));

  exec("npm publish");

  if (isGitTag) {
    const version = require("../package.json").version;

    console.log(chalk.blue("Start create git tag, version is", `v${version}`));

    exec(`git push origin v${version}`);

    console.log(chalk.blue("Finish git tag create and publish"));
  }
});
