const router = require('express').Router();
const { addBestSeller, getBestSeller, getBestSellerAdmin, getBestSellerProduct, deleteBestSeller, editActiveStatus } = require('../controllers/bestSellerController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], addBestSeller)
    .get(getBestSeller)
    .put([authorize, verifyAdmin], editActiveStatus)

router.route('/:id')
    .get(getBestSellerProduct)
    .delete(deleteBestSeller)

router.route('/admin/best_seller')
    .get([authorize, verifyAdmin], getBestSellerAdmin)

module.exports = router;