const router = require('express').Router();
const { createProductCategory, getAll, editProductCategory, deleteProductCategory,editActiveStatus } = require('../controllers/productCategoryController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], createProductCategory)
    .get(getAll)
    .put([authorize, verifyAdmin],editActiveStatus)

router.route('/:id')
    .put([authorize, verifyAdmin], editProductCategory)
    .delete([authorize, verifyAdmin], deleteProductCategory)

module.exports = router;