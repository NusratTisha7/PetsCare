const router = require('express').Router();
const { createPetCategory, getAll } = require('../controllers/petCategoryController')
const authorize = require('../middlewares/authorize');

router.route('/create')
    .post([authorize], createPetCategory)

router.route('/getAll')
    .get([authorize], getAll)

module.exports = router;