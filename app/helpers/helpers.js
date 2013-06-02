var url = require('url')
  , qs = require('querystring')
  , moment = require('moment')

function helpers () {
  return function (req, res, next) {
    res.locals.req = req
    res.locals.isActive = function (link) {
      return req.url.indexOf(link) !== -1 ? 'active' : ''
    }
    res.locals.formatDatetime = formatDatetime
    res.locals.datetimeFormatString = datetimeFormatString
    res.locals.moment = moment

    if (typeof req.flash !== 'undefined') {
      res.locals.info = req.flash('info')
      res.locals.errors = req.flash('errors')
      res.locals.success = req.flash('success')
      res.locals.warning = req.flash('warning')
    }

    next()
  }
}

module.exports = helpers

function datetimeFormatString () {
  return 'MM/DD/YY HH:mm'
}

function formatDatetime (date) {
  return moment(date).format(datetimeFormatString());
}
