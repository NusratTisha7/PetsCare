const router = require('express').Router();
const { signIn, signUp, createAdmin } = require('../controllers/userController')

router.route('/signup')
    .post(signUp)

router.route('/create-admin')
    .post(createAdmin)

router.route('/signin')
    .post(signIn)

module.exports = router;


 