var async = require('async')

module.exports = function (app, auth) {

  // operations
  var operations = require('../app/controllers/operations')
  app.get('/ops', operations.index)
  app.get('/ops/new', operations.new)
  app.post('/ops', operations.create)
  app.get('/ops/:id', operations.show)
  app.get('/ops/:id/edit', operations.edit)
  app.put('/ops/:id', operations.update)
  app.del('/ops/:id', operations.destroy)

  app.param('id', operations.operation)

  // root
  var root = require('../app/controllers/root')
  app.get('/', root.index)
}