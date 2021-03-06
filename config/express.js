var express = require('express')
  , mongoStore = require('connect-mongo')(express)
  , helpers = require('../app/helpers/helpers.js')

module.exports = function (app, config) {
  app.set('showStackError', true)
  app.use(require('stylus').middleware(config.root + '/public'));
  app.use(express.static(config.root + '/public'))
  app.use(express.logger('dev'))
  app.set('views', config.root + '/app/views')
  app.set('view engine', 'jade')

  app.configure(function () {
    // dynamic helpers
    app.use(helpers())

    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())

    // cookieParser should be above session
    app.use(express.cookieParser())
    app.use(express.session({
      secret: config.app.secret,
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }))

    // routes should be at the last
    app.use(app.router)

    // use express favicon
    app.use(express.favicon())

    // custom error handler
    app.use(function (err, req, res, next) {
      if (~err.message.indexOf('not found')) return next()
      console.error(err.stack)
      res.status(500).render('500', { title: 'Hull breached.'})
    })

    app.use(function (req, res, next) {
      res.status(404).render('404', { title: 'Signal lost.', url: req.originalUrl })
    })

  })
}
