import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  console.log('Authorization Header:', req.header('Authorization')); // Debugging line
  const authHeader = req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');
  console.log('Parsed Token:', token); // Log the token after stripping 'Bearer '

  if (!token) return res.status(401).send({ message: 'Access denied, no token provided.' });

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid token.' });
    req.user = decoded; // Attach the decoded token data to the request object
    next();
  });
};

export default auth;
