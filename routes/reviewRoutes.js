const router = require('express').Router();
const { addReview, getReviewsAdmin, getReviews, editReviewStatus } = require('../controllers/reviewController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');


router.route('/')
    .post([authorize], addReview)
    .get(getReviews)
    .put([authorize, verifyAdmin], editReviewStatus)

router.route('/admin')
    .get([authorize, verifyAdmin], getReviewsAdmin)

module.exports = router;


