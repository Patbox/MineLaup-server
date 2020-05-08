/* eslint-disable no-console */

const path = require('path')
const Memiens = require('memiens').default
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')

const config = path.resolve(__dirname, '../storage/user.yml')

async function run() {
  try {
    console.log(
      chalk.green(
        figlet.textSync('MineLaup Server\nadmin creation', {
          font: 'Small',
          verticalLayout: 'fitted',
        })
      ),
      '\n\n'
    )

    const adminResponse = await inquirer.prompt([
      {
        name: 'username',
        type: 'input',
        default: 'root',
        message: 'Admin username ?',
        validate: (value) => {
          return value.length > 0
        },
      },
      {
        name: 'password',
        type: 'password',
        message: 'Admin password ?',
        validate: (value) => {
          return value.length > 0
        },
      },
      {
        name: 'language',
        type: 'list',
        choices: ['en', 'fr'],
        default: 0,
      },
    ])

    const settings = new Memiens(config)

    settings.set('username', adminResponse.username)
    settings.set('password', adminResponse.password)
    settings.set('language', adminResponse.language)

    console.log(
      '\n\n' +
        chalk.green.bold(
          'The configuration has been generated and can be found at:\n'
        ) +
        config +
        '\n\n' +
        chalk.bold('Have a good day ! 👍')
    )
  } catch (error) {
    console.error(error)
  }
}

run()
