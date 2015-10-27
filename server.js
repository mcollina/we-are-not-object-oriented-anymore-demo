'use strict'

var Chairo = require('chairo')
var Hapi = require('hapi')
var Joi = require('joi')

var server = new Hapi.Server()
server.connection({ port: 3000 })

server.register([
  require('vision'),
  require('inert'),
  { register: require('lout') },
  { register: Chairo } ], function (err) {

  server.seneca.use('devices')

  server.route({
    method: 'GET',
    path: '/devices',
    handler: function (request, reply) {
      return reply.act({ role: 'devices', cmd: 'list' })
    }
  })

  server.route({
    method: 'POST',
    path: '/devices',
    config: {
      validate: {
        payload: {
          name: Joi.string().min(3).max(10)
        }
      }
    },
    handler: function (request, reply) {
      return reply.act({
        role: 'devices',
        cmd: 'save',
        name: request.payload.name
      })
    }
  })
})

server.start(function (err) {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
