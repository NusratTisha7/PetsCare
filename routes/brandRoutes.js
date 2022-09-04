const router = require('express').Router();
const { addNewBrand, getAllBrandItem, editBrand, deleteBrand, editActiveStatus, getAllBrandItemAdmin } = require('../controllers/brandController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], addNewBrand)
    .get(getAllBrandItem)
    .put([authorize, verifyAdmin], editActiveStatus)

router.route('/admin')
    //.get([authorize, verifyAdmin], getAllBrandItemAdmin)
    .get(getAllBrandItemAdmin)
    
router.route('/:id')
    .put([authorize, verifyAdmin], editBrand)
    .delete([authorize, verifyAdmin], deleteBrand)

module.exports = router;