const router = require('express').Router();
const { signIn, signUp } = require('../controllers/userController')

router.route('/signup')
    .post(signUp)

router.route('/signin')
    .post(signIn)

module.exports = router;

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Signup
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *       404:
 *         description: The book was not found
 */
