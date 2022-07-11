const jwt = require("jsonwebtoken");
const salt = process.env['SALT'];

function isLogin(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
        const decoded = jwt.verify(token, salt);
        req.userId = decoded.userId;
        next();
    } else {
      res.status(400).json({ success: false, message: "Bad request" });
    }
    // console.log(req.userId)
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
}

module.exports = { isLogin };
