const router = require('express').Router();
const {hotelBook} = require('../controllers/hotelBookController');
const authorize = require('../middlewares/authorize');

router.route('/')
    .post([authorize], hotelBook)
    

module.exports = router;