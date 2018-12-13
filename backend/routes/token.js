const jwt = require("jsonwebtoken");

/// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
module.exports = {
  verifyToken: function verifyToken(req, res, next) {
    // console.log(req);
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    console.log("token", req.headers["authorization"]);

    // check if bearer id undefined
    if (typeof bearerHeader !== "undefined") {
      // split at the space
      const bearer = bearerHeader.split(" ");

      // Get token from array
      const bearerToken = bearer[1];

      // set the token
      req.token = bearerToken;

      // next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(405);
    }
  }
};
