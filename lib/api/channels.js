const { Router } = require('express')
// const {
//     createChannel,
//     getAllChannels,
//     createMessage,
//     getMessages,
// } = require('../models/channel.js')

const app = Router()

// Get all channels
app.get('/', function(req, res) {
    // getAllChannels().then(channels => {
    //     res.send(channels)
    // })
})

// Create new channel
app.post('/', function(req, res) {
    const data = req.body
    console.log('data', data)
    // createChannel(data, 'password').then(channel => {
    //     console.log('channel: ', channel)
    //     // send reponse with address.
    //     res.send({
    //         message: `Channel created.`,
    //         channel: channel,
    //     })
    // })
})

app.post('/:id', function(req, res) {
    const data = req.body
    console.log('id:', req.params.id)
    console.log('data', data)
    // createMessage(req.params.id, data, 'password').then(message => {
    //     console.log('message: ', message)
    //     // send reponse with address.
    //     res.send({
    //         message: `message created.`,
    //         message: message,
    //     })
    // })
})

app.get('/:id', function(req, res) {
    const data = req.body
    console.log('id:', req.params.id)
    console.log('data', data)
    // getMessages(req.params.id).then(messages => {
    //     console.log('messages: ', messages)
    //     // send reponse with address.
    //     res.send(messages)
    // })
})

module.exports = app