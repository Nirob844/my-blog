const { generateToken } = require("../middleware/token");
const authService = require("../service/auth");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const accessToken = await authService.login({ email, password });

    const response = {
      code: 200,
      message: "Login successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.register({ name, email, password });

    // generate access token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log("payload", payload);
    const accessToken = generateToken({ payload });

    // response
    const response = {
      code: 201,
      message: "Signup successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
        login: "/authService/login",
      },
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
