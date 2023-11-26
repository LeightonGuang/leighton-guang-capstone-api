const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  if (!req.headers.autorization) {
    return res.status(401).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);

    req.user_id = decodedToken;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid auth token");
  }
};

module.exports = authenticate;
