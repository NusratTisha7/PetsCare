const router = require('express').Router();
const { addReview, getReviews, editAddressStatus } = require('../controllers/reviewController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');


router.route('/')
    .post([authorize], addReview)
    .get(getReviews)
    .put([authorize, verifyAdmin], editAddressStatus)

module.exports = router;


