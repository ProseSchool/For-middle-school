const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = process.env.JWTSECRET;

const { User } = require('../../models');
const salt = crypto.randomBytes(128).toString('base64');

router.post('/signup', async (req, res, next) => {
  const { id, password } = req.body;
  try {
    const hash = crypto
      .createHash('sha256')
      .update(password + salt)
      .digest('hex');
    await User.create({
      id,      password: hash,
    });
    return res.status(200).json({
      code: 200,
      message: 'success sign up!',
    });
  } catch (error) {
    return res.status(409).json({
      code: 409,
      message: 'exist user',
    });
  }
});

router.post('/', async (req, res, next) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ id : id });
    console.log(user.id, user.password)
    const hash = crypto
      .createHash('sha256')
      .update(password + salt)
      .digest('hex');
    console.log(user.password, hash)
    if (user.password == hash) {
      const accessToken = jwt.sign(
        {
          id: user.id,
          password: user.password,
        },
        secretKey,
        {
          expiresIn: '1h',
        },
      );
      const refreshToken = jwt.sign(
        {
          id: user.id,
          password: user.password,
        },
        secretKey,
        {
          expiresIn: '14d',
        },
      );
      return res.status(200).json({
        code: 200,
        message: 'successful login',
        accessToken,
        refreshToken,
      });
    } else {
      return res.status(403).json({
        code: 403,
        message: 'failed login',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'user is not exist',
    });
  }
});

module.exports = router;
