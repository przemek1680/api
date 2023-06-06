const jwt_decode = require('jwt-decode');
exports.adminOnly = (req, res, next) => {
  var token = req.session.token;
  if (token != null) {
    var decoded = jwt_decode(token);
    console.log(decoded.admin);
    if (decoded.admin == true) {
      next();
      console.log('ADMIN');
    } else {
      res.status(403).send('Access denied');
    }
  }
};
