const router = require('express').Router();
const { product, pet, treatment, hotel, ipn, paymentSuccess } = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');

router.route('/product')
    .get([authorize], product);

router.route('/pet')
    .post([authorize], pet);

router.route('/treatment')
    .post([authorize], treatment);

router.route('/hotel')
    .post([authorize], hotel);

router.route('/ipn')
    .post(ipn);

router.route('/success')
    .post(paymentSuccess);

module.exports = router;