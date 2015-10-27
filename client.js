'use string'

var seneca = require('seneca')()
var client = seneca.client()

seneca
  .act({
    role: 'devices',
    cmd: 'save',
    name: 'mything'
  })
  .act({
    role: 'devices',
    cmd: 'save',
    name: 'anotherthing'
  })
  .act({
    role: 'devices',
    cmd: 'save',
    name: 'abcde',
    properties: {
      color: 'red'
    }
  })
  .act({
    role: 'devices',
    cmd: 'list'
  }, console.log)

