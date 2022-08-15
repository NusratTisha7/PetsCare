const query = require('../config/db')

module.exports.initPayment = async (req, res) => {

    //     const userId = req.user.result.id;

    //     //get cart
    //     let getCartSql = "SELECT * FROM cart WHERE userID = ?";
    //     var cartItem = []
    //     // await conn.promise().query(getCartSql, [userId], function (err, result) {
    //     //     if (err) return res.status(400).send({ message: 'Something failed!' });
    //     //     cartItem = result
    //     // })

    //     //get profile
    //     let profileSql = "SELECT * FROM profile WHERE userID = ?";
    //     var profile = {}
    //     await query(profileSql, [userId], function (err, result) {
    //         if (err) return res.status(400).send({ message: 'Something failed!' });
    //         profile = result[0]
    //     })

    // //    await query(profileSql, [userId]).then(res=>{
    // //         profile=res
    // //     })

}

module.exports.ipn = async (req, res) => {
}

module.exports.paymentSuccess = async (req, res) => {
}