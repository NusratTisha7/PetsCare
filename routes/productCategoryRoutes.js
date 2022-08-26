const router = require('express').Router();
const { createProductCategory,getAllForAdmin, getAll, editProductCategory, deleteProductCategory, editActiveStatus } = require('../controllers/productCategoryController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], createProductCategory)
    .get(getAll)
    .put([authorize, verifyAdmin], editActiveStatus)

router.route('/:id')
    .put([authorize, verifyAdmin], editProductCategory)
    .delete([authorize, verifyAdmin], deleteProductCategory)

router.route('/admin')
    .get([authorize, verifyAdmin], getAllForAdmin)

module.exports = router;