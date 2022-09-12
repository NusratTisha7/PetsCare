const router = require('express').Router();
const { product, pet, treatment, hotel } = require('../controllers/getOrderController');
const authorize = require('../middlewares/authorize');

router.route('/product')
    .get([authorize], product);

router.route('/pet')
    .get([authorize], pet);

router.route('/treatment')
    .get([authorize], treatment);

router.route('/hotel')
    .get([authorize], hotel);


module.exports = router;