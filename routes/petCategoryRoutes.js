const router = require('express').Router();
const { createPetCategory, getAll } = require('../controllers/petCategoryController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/create')
    .post([authorize, verifyAdmin], createPetCategory)

router.route('/getAll')
    .get(getAll)

module.exports = router;