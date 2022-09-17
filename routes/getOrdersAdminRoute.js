const router = require('express').Router();
const { productAdmin, petAdmin, treatmentAdmin, hotelAdmin } = require('../controllers/getOrdersAdminController');
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/product/:page')
    .get([authorize, verifyAdmin], productAdmin);

router.route('/pet/:page')
    .get([authorize, verifyAdmin], petAdmin);

router.route('/treatment/:page')
    .get([authorize, verifyAdmin], treatmentAdmin);

router.route('/hotel/:page')
    .get([authorize, verifyAdmin], hotelAdmin);


module.exports = router;