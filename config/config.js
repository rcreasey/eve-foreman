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
    db: process.env.MONGOHQ_URL,
    app: {
      secret: 's3kr3t_34t1ng'
    }
  }
}