const router = require('express').Router();
const { signIn, createCustomer, createAdmin, resendOTP, verifyUser, editActiveStatus } = require('../controllers/userController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');


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

router.route('/')
    .put([authorize, verifyAdmin], editActiveStatus)



module.exports = router;


