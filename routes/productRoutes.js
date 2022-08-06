const router = require('express').Router();
const { addNewProduct, getAllProducts, getOneProduct, sortByCategory, sortProduct, searchProduct, filterProduct } = require('../controllers/productController')
const upload = require("../middlewares/multer");
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/create')
    .post([authorize, verifyAdmin], upload.single("photo"), addNewProduct)

router.route('/getAll')
    .get(getAllProducts)

router.route('/getOne/:id')
    .get(getOneProduct)

router.route('/sort_by_category/:id')
    .get(sortByCategory)

router.route('/sort_product')
    .get(sortProduct)

router.route('/search_product')
    .get(searchProduct)

router.route('/filter_product')
    .get(filterProduct)

module.exports = router;