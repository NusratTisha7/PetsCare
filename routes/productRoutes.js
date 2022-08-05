const router = require('express').Router();
const { addNewProduct, getAllProducts, getOneProduct, sortByCategory, sortProduct, searchProduct ,filterProduct} = require('../controllers/productController')
const upload = require("../middlewares/multer");
const authorize = require('../middlewares/authorize');

router.route('/create')
    .post([authorize], upload.single("photo"), addNewProduct)

router.route('/getAll')
    .get([authorize], getAllProducts)

router.route('/getOne/:id')
    .get([authorize], getOneProduct)

router.route('/sort_by_category/:id')
    .get([authorize], sortByCategory)

router.route('/sort_product')
    .get([authorize], sortProduct)

router.route('/search_product')
    .get([authorize], searchProduct)

router.route('/filter_product')
    .get([authorize], filterProduct)

module.exports = router;