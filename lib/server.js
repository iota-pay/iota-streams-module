module.exports = { createServer }

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
var cors = require('cors')

const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
const api = require('./api')

/**
 * Creates and returns a express server.
 * @param {object} app - an express application.
 * @param {object} options - an options object.
 * @param {String} options.mount - The payment route name.
 * @param {Number} options.value - The default IOTA value.
 * @returns {object} an http server
 * @example
 * // creates a simple server
 * var mamModule = require('mam-module')
 * var app = require('express')()
 *
 * let server = mamModule.createServer(app, {mount: '/mam'})
 *
 * // Start server with mam-module module on '/mam'
 * server.listen(3000, function () {
 *    console.log(`Server started on http://localhost:3000 `)
 * })
 */
function createServer(app, options = {}) {
    options = options || {}
    app = app || express()

    app.use(bodyParser.json()) // to support JSON-encoded bodies
    app.use(
        bodyParser.urlencoded({
            // to support URL-encoded bodies
            extended: true,
        })
    )
    app.use(cors())

    app.use(passport.initialize({ session: false }))

    const jwtOptions = {
        secretOrKey: 'test_secret',
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    }

    passport.use(
        'jwt',
        new Strategy(jwtOptions, (jwtPayload, done) => {
            const user = jwtPayload
            if (user) return done(null, user)
            else return done(null, false)
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user)
    })
    let mount = options.mount || '/'

    app.use(mount + 'api', api({}))

    app.use(mount, express.static('frontend/dist'))

    // Removing ending '/'
    if (mount.length > 1 && mount[mount.length - 1] === '/') {
        mount = mount.slice(0, -1)
    }

    console.log('Base URL (--mount): ' + mount)

    let server

    // TODO: Check usage of https as server.
    server = http.createServer(app)

    if (process.env.debug === 'true') {
        console.log('debug true')
    }

    return server
}