const router = require('express').Router();
const auth = require('../controllers/authController');

router.post('/api/v1/auth/register', auth.register);
router.post('/api/v1/auth/login', auth.login);

module.exports = router;