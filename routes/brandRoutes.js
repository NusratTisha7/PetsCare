const router = require('express').Router();
const { addNewBrand, getAllBrandItem } = require('../controllers/brandController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], addNewBrand)
    .get(getAllBrandItem)


module.exports = router;