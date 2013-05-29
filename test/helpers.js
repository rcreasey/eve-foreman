var mongoose = require('mongoose')
  , async = require('async')
  , Operation = mongoose.model('Operation')


exports.clearDb = function (done) {
  var callback = function (item, fn) { item.remove(fn) }

  async.parallel([
    function (cb) {
      Operation.find().exec(function (err, operations) {
        async.forEach(operations, callback, cb)
      })
    }
  ], done)
}
