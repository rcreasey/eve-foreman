var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , Schema = mongoose.Schema

// schema
var OperationSchema = new Schema({
    system      : {type : String, default : '', trim : true}
  , starts_at   : {type : Date, default : Date.now}
  , created_at  : {type : Date, default : Date.now}
})

// validations
OperationSchema.path('system').validate(function (system) {
  return system.length > 0
}, 'System name cannot be blank')

// static functions
OperationSchema.statics = {
  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb)
  },

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .sort({'createdAt': -1})
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb)
  }
}

mongoose.model('Operation', OperationSchema)