const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const FILE_NAME = 'options.json'

const file = require('../options.json')

module.exports = {
    getCurrentDirectoryBase: () => {
        return path.basename(process.cwd())
    },

    exist: () => {
        return file.seed
    },
    createFile: options => {
        const jsonContent = JSON.stringify(options)
        return fs.writeFile(FILE_NAME, jsonContent, 'utf8', function(err) {
            if (err) return err
            console.log(chalk.greenBright('Options file created.'))
        })
    },
}