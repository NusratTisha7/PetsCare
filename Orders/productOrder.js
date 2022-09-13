const query = require('../config/db')

module.exports.productOrder = async (values,callBack) => {
    let cartItem = JSON.stringify(values.cartItems);
    let { tranId, sessionkey, totalAmount, userId, cashOn } = values
    let sql = "CREATE TABLE IF NOT EXISTS orders (id INT AUTO_INCREMENT PRIMARY KEY, cartItem VARCHAR(255), transactionID  VARCHAR(255), sessionkey VARCHAR(255),userID int, FOREIGN KEY (userID) REFERENCES user(id),totalAmount int, paymentStatus VARCHAR(255), valId VARCHAR(255), isActive BOOLEAN,cashOn BOOLEAN)";
    await query(sql).then(async response => {
        let sql = "INSERT INTO orders (cartItem,transactionID,sessionkey,totalAmount,userID,isActive,cashOn) VALUES ?";
        let values = [[cartItem, tranId, sessionkey, totalAmount, userId, 1, cashOn]]
        await query(sql, [values]).then(async res => {
            let sql = "DELETE FROM cart WHERE userID = ?"
            await query(sql, [userId]).then(response => {
                callBack(null,response)
            }).catch(err => {
                callBack(err)
            })
        }).catch(err => console.log(err))
    }).catch(err => {
        console.log(err)
    })
}