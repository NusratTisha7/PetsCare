const router = require('express').Router();
const {
    addNewOffer,
    editOffer,
    getAllOffer,
    getOneOfferProduct,
    getOneOfferCategory,
    deleteOffer,
    editActiveStatus,
    getAllOfferAdmin
} = require('../controllers/lattestOfferController');
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');
const upload = require("../middlewares/multer");

router.route('/')
    .post([authorize, verifyAdmin], upload.single("photo"), addNewOffer)
    .get(getAllOffer)
    .put([authorize, verifyAdmin], editActiveStatus)

router.route('/:id')
    .delete([authorize, verifyAdmin], deleteOffer)
    .put([authorize, verifyAdmin], upload.single("photo"), editOffer)

router.route('/product/:id')
    .get(getOneOfferProduct)

router.route('/category/:id')
    .get(getOneOfferCategory)

router.route('/admin')
    //.get([authorize, verifyAdmin], getAllOfferAdmin)
    .get( getAllOfferAdmin)

module.exports = router;