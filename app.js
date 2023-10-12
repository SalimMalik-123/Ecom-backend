const jwt = require("jsonwebtoken");

const { SECRET = "secret" } = process.env;
const verifyToken = (req, res,next) => {
  const token = req.cookies.token;
  let c= req.headers;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please log in.' });
  }

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified;
    console.log(verified);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
