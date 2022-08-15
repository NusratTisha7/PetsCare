const router = require('express').Router();
const { addReview, getReviews } = require('../controllers/reviewController')
const authorize = require('../middlewares/authorize');


router.route('/')
    .post([authorize], addReview)
    .get(getReviews)

module.exports = router;


