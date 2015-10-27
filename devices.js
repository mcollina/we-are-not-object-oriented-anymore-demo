'use strict'

var seneca = require('seneca')()
var uuid = require('uuid')
var plugin = 'devices'
var devices = {}

seneca.add({
  role: plugin,
  cmd: 'save'
}, function (msg, done) {
  var device = {
    id: uuid.v4(),
    name: msg.name,
    properties: msg.properties
  }

  devices[device.id] = device
  done()
})

seneca.add({
  role: plugin,
  cmd: 'list'
}, function (msg, done) {
  done(null, Object.keys(devices).map(function (id) {
    return devices[id]
  }))
})

seneca
  .act({
    role: plugin,
    cmd: 'save',
    name: 'mything'
  })
  .act({
    role: plugin,
    cmd: 'save',
    name: 'anotherthing'
  })
  .act({
    role: plugin,
    cmd: 'save',
    name: 'abcde',
    properties: {
      color: 'red'
    }
  })
  .act({
    role: plugin,
    cmd: 'list'
  }, console.log)

