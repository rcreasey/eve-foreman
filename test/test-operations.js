var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../server')
  , context = describe
  , Operation = mongoose.model('Operation')

var count, cookies

describe('Operations', function () {

  describe('GET /operations', function () {
    it('should respond with Content-Type text/html', function (done) {
      request(app)
      .get('/operations')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(/Operations Manifest/)
      .end(done)
    })
  })

  after(function (done) {
    require('./helper').clearDb(done)
  })
})
