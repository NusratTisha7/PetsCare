const router = require('express').Router();
const { createProductCategory,getAll } = require('../controllers/productCategoryController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/create')
    .post([authorize,verifyAdmin], createProductCategory)

router.route('/getAll')
    .get( getAll)
module.exports = router;