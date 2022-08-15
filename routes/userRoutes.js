const router = require('express').Router();
const { signIn, createCustomer, createAdmin, resendOTP, verifyUser } = require('../controllers/userController')

router.route('/signup')
    .post(createCustomer)

router.route('/create-admin')
    .post(createAdmin)

router.route('/signin')
    .post(signIn)

router.route('/resend_otp')
    .post(resendOTP)

router.route('/verify_user')
    .post(verifyUser)

module.exports = router;


