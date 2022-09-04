const router = require('express').Router();
const { createPetCategory, getAll, editPetCategory, deletePetCategory,editActiveStatus,getAllForAdmin } = require('../controllers/petCategoryController')
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], createPetCategory)
    .get(getAll)
    .put([authorize, verifyAdmin],editActiveStatus)

router.route('/:id')
    .put([authorize, verifyAdmin], editPetCategory)
    .delete([authorize, verifyAdmin], deletePetCategory)

    router.route('/admin')
    //.get([authorize, verifyAdmin], getAllForAdmin)
    .get(getAllForAdmin)

module.exports = router;