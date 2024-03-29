const User = require("../models/user.model");

const authorization = (permittedRoles) => {
  return async (req, res, next) => {
    if (!permittedRoles || permittedRoles.length == 0) {
      return next();
    }
    const user = await req.user;
    const userAllowed = await User.findOne({
      _id: user._id,
      roles: { $in: permittedRoles },
    })
      .lean()
      .exec();
    if (userAllowed) return next();
    return res
      .status(401)
      .json({ status: "failed", message: "User not found" });
  };
};

module.exports = authorization;
