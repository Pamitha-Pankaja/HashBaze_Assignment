const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      try {
        if (err) {
          return res.status(401).json({ error: "Unauthorized!" });
        }

        // Find the user by ID and exclude password
        const user = await User.findOne({ _id: payload._id }).select("-password");
        
        // Attach user to the request object
        req.user = user;
        
        // Proceed to the next middleware or route
        next();
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.status(403).json({ error: "Forbidden" });
  }
};

