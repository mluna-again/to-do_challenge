const jwt = require("jsonwebtoken");

function generateToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
  const token = req.headers["auth"];
  if (token === null)
    return res.status(401).json({ message: "No authenticated" }); // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: err });
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  generateToken,
};
