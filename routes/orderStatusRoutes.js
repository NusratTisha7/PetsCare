const router = require('express').Router();
const {
    orderStatus
} = require('../controllers/orderStatusController');
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .put([authorize, verifyAdmin], orderStatus)

module.exports = router;