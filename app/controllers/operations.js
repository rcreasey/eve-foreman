var mongoose = require('mongoose')
  , async = require('async')
  , Operation = mongoose.model('Operation')
  , _ = require('underscore')

mongoose.set('debug', true)

// Find operation by id
exports.operation = function(req, res, next, id){
  Operation.load(id, function (err, operation) {
    if (err) return next(err)
    if (!operation) return next(new Error('Failed to load operation ' + id))
    req.operation = operation
    next()
  })
}

// GET /ops
exports.index = function(req, res) {
  res.locals.path = req.path
  var page = req.param('page') > 0 ? req.param('page') : 0
  var perPage = 10
  var options = {
    perPage: perPage,
    page: page
  }

  Operation.list(options, function(err, operations) {
    if (err) return res.render('500')
    Operation.count().exec(function (err, count) {
      res.render('operations/index', {
        title: 'Operations Manifest',
        operations: operations,
        page: page,
        pages: count / perPage
      })
    })
  })
}

// GET /ops/:id
exports.show = function(req, res) {
  res.locals.path = req.path
  Operation.load(req.params.id, function(err, operation) {
    if (err) return res.render('404')
    res.render('operations/show', {
      title: 'Operation',
      operation: operation
    })
  })
}

// GET /ops/new
exports.new = function(req, res){
  res.locals.path = req.path
  res.render('operations/new', {
    title: 'Register an Operation',
    operation: new Operation({})
  })
}

// POST /ops
exports.create = function (req, res) {
  res.locals.path = req.path
  var operation = new Operation(req.body)
  operation.save(function(err) {
    if (err) {
      res.render('operations/new', {
        title: 'Register an Operation',
        operation: operation,
        errors: err.errors,
        req: req.body
      })
    }
    else {
      res.redirect('/ops/' + operation._id)
    }
  })
}

// GET /ops/:id/edit
exports.edit = function (req, res) {
  res.locals.path = req.path
  Operation.load(req.params.id, function(err, operation) {
    if (err) return res.render('404')
    res.render('operations/edit', {
      title: 'Edit Operation',
      operation: operation
    })
  })
}

// PUT /ops/:id
exports.update = function(req, res) {
  res.locals.path = req.path
  var operation = req.operation
  operation = _.extend(operation, req.body)

  operation.save(function (err) {
    if (err) {
      res.render('operations/edit', {
        title: 'Edit Operation',
        operation: operation,
        errors: err.errors
      })
    }
    else {
      res.redirect('/ops/' + operation._id)
    }
  })
}

// DELETE /ops/:id
exports.destroy = function(req, res){
  var operation = req.operation
  operation.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/ops')
  })
}

