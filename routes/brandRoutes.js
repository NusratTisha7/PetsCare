const router = require('express').Router();
const { addNewBrand, getAllBrandItem, editBrand, deleteBrand,editActiveStatus } = require('../controllers/brandController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], addNewBrand)
    .get(getAllBrandItem)
    .put([authorize, verifyAdmin],editActiveStatus)

router.route('/:id')
    .put([authorize, verifyAdmin], editBrand)
    .delete([authorize, verifyAdmin], deleteBrand)

module.exports = router;