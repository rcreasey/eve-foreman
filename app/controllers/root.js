// GET /
exports.index = function (req, res) {
  res.render('root/index', {title: 'index'})
}