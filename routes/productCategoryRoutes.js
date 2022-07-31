const router = require('express').Router();
const { createProductCategory,getAll } = require('../controllers/productCategoryController')
const authorize = require('../middlewares/authorize');

router.route('/create')
    .post([authorize], createProductCategory)

router.route('/getAll')
    .get([authorize], getAll)
module.exports = router;