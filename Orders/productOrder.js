const query = require('../config/db')

module.exports.productOrder = async (values) => {
    let cartItem = JSON.stringify(values.cartItems);
    let { tranId, sessionkey, totalAmount, userId } = values
    let sql = "CREATE TABLE IF NOT EXISTS orders (id INT AUTO_INCREMENT PRIMARY KEY, cartItem VARCHAR(255), transactionID  VARCHAR(255), sessionkey VARCHAR(255),userID int, FOREIGN KEY (userID) REFERENCES user(id),totalAmount int)";
    await query(sql).then(async response => {
        let sql = "INSERT INTO orders (cartItem,transactionID,sessionkey,totalAmount,userID) VALUES ?";
        let values = [[cartItem, tranId, sessionkey, totalAmount, userId]]
        await query(sql, [values]).then(res => console.log(res)).catch(err => console.log(err))
    }).catch(err => {
        console.log(err)
    })
}