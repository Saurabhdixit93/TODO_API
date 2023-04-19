const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated
const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Auth Error' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Invalid Token' });
    }
  };

module.exports = auth;