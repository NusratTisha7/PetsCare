const router = require('express').Router();
const { addNewPet, getAllPets, getAllPetsAdmin, getOnePet, editPet, deletePet, editActiveStatus } = require('../controllers/petController')
const upload = require("../middlewares/multer");
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize, verifyAdmin], upload.single("photo"), addNewPet)
    .get(getAllPets)
    .put([authorize, verifyAdmin], editActiveStatus)


router.route('/:id')
    .get(getOnePet)
    .put([authorize, verifyAdmin], upload.single("photo"), editPet)
    .delete([authorize, verifyAdmin], deletePet)

router.route('/admin/allpets/:page')
    //.get([authorize, verifyAdmin], getAllPetsAdmin)
    .get(getAllPetsAdmin)

module.exports = router;