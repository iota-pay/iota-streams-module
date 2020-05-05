const { version } = require('../../package.json')
const { Router } = require('express')
const auth = require('./auth')
const channels = require('./channels')

module.exports = function api({ config, db }) {
    const app = Router()
    app.use('/auth', auth)
    app.use('/channels', channels)
    // perhaps expose some API metadata at the root
    app.get('/info', (req, res) => {
        res.json({ version })
    })

    return app
}