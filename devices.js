'use strict'

var uuid = require('uuid')
var plugin = 'devices'
var devices = {}

function build () {
  var seneca = this

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

  return 'devices'
}

module.exports = build
