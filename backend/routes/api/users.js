const express = require('express')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// validations for signup route
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('userName')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('userName')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({checkFalsy: true})
      .isLength({min: 1})
      .withMessage('Please provide a first name'),
    check('lastName')
      .exists({checkFalsy: true})
      .isLength({min: 1})
      .withMessage('Please provide a LastName'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, userName, firstName, lastName } = req.body;
      const user = await User.signup({ email, userName, password, firstName, lastName });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user: user
      });
    }
  );

module.exports = router;