const router = require('express').Router();
const auth = require('./auth/user');

router.use('/auth', auth);

module.exports = router;