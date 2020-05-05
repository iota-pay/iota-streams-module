const inquirer = require('inquirer')
const { generateSeed } = require('./utils/iota')
module.exports = {
    askForOptions: () => {
        const questions = [
            {
                name: 'seed',
                type: 'input',
                message:
                    'Please enter a new seed (for random seed leave it blank) \n',
                validate: function(value) {
                    if (value.length === 81) {
                        return true
                    } else if (value.length > 81) {
                        return 'Your intput has more than 81 charakters. Please enter a correct seed.'
                    } else if (value.length < 81) {
                        return 'Your intput has less than 81 charakters. Please enter a correct seed.'
                    } else {
                        return 'Please enter your seed.'
                    }
                },
                filter: function(value) {
                    if (value.length === 0) {
                        return generateSeed()
                    }
                    return value
                },
            },
            {
                name: 'provider',
                type: 'input',
                message:
                    'Please enter a iri provider (blank = comnet default prodiver powered by https://comnet.thetangle.org ) \n',
                validate: function(value) {
                    var pattern = new RegExp(
                        '^(https?:\\/\\/)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                            '(\\#[-a-z\\d_]*)?$',
                        'i'
                    ) // fragment locator
                    if (!!pattern.test(value)) {
                        return true
                    } else {
                        return 'This is not a valid url!'
                    }
                },
                filter: function(value) {
                    if (value.length === 0) {
                        return 'https://nodes.comnet.thetangle.org:443'
                    }
                    return value
                },
            },
        ]
        return inquirer.prompt(questions)
    },
}