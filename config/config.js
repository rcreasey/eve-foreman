module.exports = {
  development: {
    root: require('path').normalize(__dirname + '/..'),
    db: 'mongodb://localhost/eveforeman',
    app: {
      secret: 'dev'
    }
  },
  test: {
    root: require('path').normalize(__dirname + '/..'),
    db: 'mongodb://localhost/eveforeman_test',
    app: {
      secret: 'test'
    }
  },
  production: {
    root: require('path').normalize(__dirname + '/..'),
    db: 'mongodb://foreman:foremaneve@dbh35.mongolab.com:27357/heroku_app15945165',
    app: {
      secret: 's3kr3t_34t1ng'
    }
  }
}