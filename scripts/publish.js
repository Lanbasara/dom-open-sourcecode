const inquirer = require("inquirer");
const chalk = require("chalk");
const shell = require("shelljs");
const { exec, env } = shell

const prevVersion = env['npm_package_version'];


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
];

inquirer.prompt(questions).then((ans) => {
  const type = ans["publish_type"];

  console.log(console.log(chalk.blue(`1. Start publish new ${type} version`)));

  console.log(chalk.blue("2. Start compiling...."));

  exec("npm run build");


  inquirer
    .prompt({
      type: "confirm",
      name: "update_version",
      message: `Current version is ${prevVersion}, do ${type} update and publish?`,
      default: false,
    })
    .then((ans) => {
      const isUpdate = ans["update_version"];
      if (isUpdate) {
        console.log(chalk.blue("3. Start update version"));

        if (exec(`npm --no-git-tag-version version ${type}`).code !== 0) {
          shell.echo("Error: npm version error");
          shell.exit(1);
        }

        console.log(chalk.blue("4. Publishing..."));

        exec("npm publish");

        inquirer
          .prompt({
            type: "confirm",
            name: "git_tag",
            message: "Create a git tag?",
            default: false,
          })
          .then((ans) => {
            const isGitTag = ans["git_tag"];
            if (isGitTag) {
              const version = require("../package.json").version;

              console.log(
                chalk.blue("Start create git tag, version is", `v${version}`)
              );

              exec(`git tag v${version}`)

              exec(`git push origin v${version}`);

              console.log(chalk.blue("Finish git tag create and publish"));
            }
          });
      }
    });
});
