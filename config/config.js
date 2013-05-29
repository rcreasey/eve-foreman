module.exports = {
  development: {
    root: require('path').normalize(__dirname + '/..'),
    db: 'mongodb://localhost/eveforeman',
    app: {
      secret: 's3kr3t_34t1ng'
    }
  },
  test: {
    root: require('path').normalize(__dirname + '/..'),
    db: 'mongodb://localhost/eveforeman_test',
    app: {
      secret: 'testing'
    }
  },
  production: {

  }
}