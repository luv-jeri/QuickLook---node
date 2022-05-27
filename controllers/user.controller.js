const User = require('../database/schema/user.schema');

const signup = _catcher(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  //   if (password !== confirmPassword) {
  //     return next("Passwords don't match");
  //   }

  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    data: newUser,
  });
});

module.exports = {
  signup,
};
