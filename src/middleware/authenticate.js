const { verifyToken } = require("./token");
const userService = require("../service/user");
const { authenticationError } = require("../utils/error");

const authenticate = async (req, _res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = verifyToken({ token });
    const user = await userService.findUserByEmail(decoded.email);

    if (!user) {
      next(authenticationError());
    }

    if (user.status !== "approved") {
      next(authenticationError(`Your account is ${user.status}`));
    }

    req.user = { ...user._doc, id: user.id };
    next();
  } catch (e) {
    next(authenticationError());
  }
};

module.exports = authenticate;
