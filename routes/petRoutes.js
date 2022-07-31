const router = require('express').Router();
const { addNewPet, getAllPets, getOnePet } = require('../controllers/petController')
const upload = require("../middlewares/multer");
const authorize = require('../middlewares/authorize');

router.route('/create')
    .post([authorize], upload.single("photo"), addNewPet)

router.route('/getAll')
    .get([authorize], getAllPets)

router.route('/getOne/:id')
    .get([authorize], getOnePet)

module.exports = router;