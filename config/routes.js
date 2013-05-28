var mongoose = require('mongoose')

module.exports = function (app, auth) {
  var root = require('../app/controllers/root')
  app.get('/', root.index)
}