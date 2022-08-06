const router = require('express').Router();
const { signIn, signUp, createAdmin } = require('../controllers/userController')

router.route('/signup')
    .post(signUp)

router.route('/create-admin')
    .post(createAdmin)

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
