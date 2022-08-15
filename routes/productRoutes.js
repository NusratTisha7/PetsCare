const router = require('express').Router();
const { addNewProduct, getAllProducts, getOneProduct, sortByCategory, sortProduct, searchProduct, filterProduct, editProduct, deleteProduct } = require('../controllers/productController')
const upload = require("../middlewares/multer");
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], upload.single("photo"), addNewProduct)
    .get(getAllProducts)

router.route('/:id')
    .get(getOneProduct)
    .put([authorize, verifyAdmin], upload.single("photo"), editProduct)
    .delete([authorize, verifyAdmin], deleteProduct)

router.route('/sort_by_category/:id')
    .get(sortByCategory)

router.route('/sort/product')
    .get(sortProduct)

router.route('/search/product')
    .get(searchProduct)

router.route('/filter/product')
    .get(filterProduct)

module.exports = router;