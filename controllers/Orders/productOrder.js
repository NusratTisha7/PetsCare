const query = require('../../config/db')

module.exports.createOrder = async (values) => {
    let cartItem = JSON.stringify(values.cartItems);
    let transactionID = values.tranId
    let sessionkey = values.sessionkey
    let sql = "CREATE TABLE IF NOT EXISTS orders (id INT AUTO_INCREMENT PRIMARY KEY, cartItem VARCHAR(255), transactionID  VARCHAR(255), sessionkey VARCHAR(255))";
    await query(sql).then(async response => {
        let sql = "INSERT INTO orders (cartItem,transactionID,sessionkey) VALUES ?";
        let values = [[cartItem,transactionID,sessionkey]]
        await query(sql, [values]).then(res => console.log(res)).catch(err => console.log(err))
    }).catch(err => {
        console.log(err)
    })
}