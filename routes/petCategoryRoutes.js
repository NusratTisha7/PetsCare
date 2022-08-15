const router = require('express').Router();
const { createPetCategory, getAll, editPetCategory, deletePetCategory } = require('../controllers/petCategoryController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], createPetCategory)
    .get(getAll)

router.route('/:id')
    .put([authorize, verifyAdmin], editPetCategory)
    .delete([authorize, verifyAdmin], deletePetCategory)

module.exports = router;