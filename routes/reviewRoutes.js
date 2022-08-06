const router = require('express').Router();
const { addProductReview, getProductReviews, addPetReview, getPetReviews } = require('../controllers/reviewController')
const authorize = require('../middlewares/authorize');

router.route('/')
    .post([authorize], addProductReview)

router.route('/product/:id')
    .get(getProductReviews)


router.route('/pet/:id')
    .get(getPetReviews)


module.exports = router;