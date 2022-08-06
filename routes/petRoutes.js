const router = require('express').Router();
const { addNewPet, getAllPets, getOnePet } = require('../controllers/petController')
const upload = require("../middlewares/multer");
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/create')
    .post([authorize, verifyAdmin], upload.single("photo"), addNewPet)

router.route('/getAll')
    .get(getAllPets)

router.route('/getOne/:id')
    .get(getOnePet)

module.exports = router;