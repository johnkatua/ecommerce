exports.userSignupValidator = (req,res,next) => {
  req.check('name', 'name is required').notEmpty();
  req.check('email', 'email is required')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    .withMessage('Invalid email address')
    .isLength({
      min: 4,
      max: 20
    });
  req.check('password', 'Passwordis required').notEmpty()
  req.check('password')
    .isLength({
      min: 5
    })
  .withMessage('Password is too short')
  .matches(/\d/)
  .withMessage('Password must contain atleast a digit');

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(err => err.msg)[0];
    return res.status(400).json({ err: firstError});
  };
  next();
};