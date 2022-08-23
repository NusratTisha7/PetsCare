const router = require('express').Router();
const { createPetCategory, getAll, editPetCategory, deletePetCategory,editActiveStatus } = require('../controllers/petCategoryController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], createPetCategory)
    .get(getAll)
    .put([authorize, verifyAdmin],editActiveStatus)

router.route('/:id')
    .put([authorize, verifyAdmin], editPetCategory)
    .delete([authorize, verifyAdmin], deletePetCategory)

module.exports = router;