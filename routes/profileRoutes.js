const router = require('express').Router();
const { getProfile, editProfile, addAddress, getAddress, deleteAddress, editActiveStatus, editAddressStatus } = require('../controllers/profileController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');
const upload = require("../middlewares/multer");

router.route('/:id')
    .get([authorize], getProfile)
    .put([authorize], upload.single("photo"), editProfile)

router.route('/')
    .put([authorize, verifyAdmin], editActiveStatus)

router.route('/address/staus-update')
    .put([authorize, verifyAdmin], editAddressStatus)

router.route('/address/:id')
    .post([authorize], addAddress)
    .get([authorize], getAddress)
    .delete([authorize], deleteAddress)

module.exports = router;


