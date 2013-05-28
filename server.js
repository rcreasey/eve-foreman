var express = require('express')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , mongoose = require('mongoose')
  , modelsPath = __dirname + '/app/models'

mongoose.connect(config.db)

// Bootstrap models
require('fs').readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath+'/'+file)
})

var app = express()

// Bootstrap application settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app)

// Start the app by listening on <port>
var port = process.env.PORT || 3000
app.listen(port)
console.log('Express app started on port '+port)
