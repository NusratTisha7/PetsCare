const router = require('express').Router();
const {
    addCartItem,
    getCartItem,
    updateCartItem,
    deleteCartItem,
    editActiveStatus
} = require('../controllers/cartController');
const authorize = require('../middlewares/authorize');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.route('/')
    .post([authorize], addCartItem)
    .put([authorize], updateCartItem);

router.route('/update-status')
    .put([authorize, verifyAdmin], editActiveStatus)

router.route('/:id')
    .get([authorize], getCartItem)
    .delete([authorize], deleteCartItem);

module.exports = router;