const router = require('express').Router();
const {
    addNewOffer,
    editOffer,
    getAllOffer,
    getOneOfferProduct,
    getOneOfferCategory,
    deleteOffer
} = require('../controllers/lattestOfferController');
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');
const upload = require("../middlewares/multer");

router.route('/')
    .post([authorize, verifyAdmin], upload.single("photo"), addNewOffer)
    .put([authorize, verifyAdmin], editOffer)
    .get(getAllOffer)

router.route('/:id')
    .delete([authorize, verifyAdmin], deleteOffer);

router.route('/product/:id')
    .get(getOneOfferProduct)

router.route('/category/:id')
    .get(getOneOfferCategory)

module.exports = router;