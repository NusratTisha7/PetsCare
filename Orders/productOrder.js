const query = require('../config/db')

module.exports.productOrder = async (values) => {
    let cartItem = JSON.stringify(values.cartItems);
    let { tranId, sessionkey, totalAmount, userId, cashOn } = values
    let sql = "CREATE TABLE IF NOT EXISTS orders (id INT AUTO_INCREMENT PRIMARY KEY, cartItem VARCHAR(255), transactionID  VARCHAR(255), sessionkey VARCHAR(255),userID int, FOREIGN KEY (userID) REFERENCES user(id),totalAmount int, paymentStatus VARCHAR(255), valId VARCHAR(255), isActive BOOLEAN,cashOn BOOLEAN)";
    await query(sql).then(async response => {
        let sql = "INSERT INTO orders (cartItem,transactionID,sessionkey,totalAmount,userID,isActive,cashOn) VALUES ?";
        let values = [[cartItem, tranId, sessionkey, totalAmount, userId, 1, cashOn]]
        await query(sql, [values]).then(async res => {
            let sql = "DELETE FROM cart WHERE userID = ?"
            await query(sql, [userId]).then(response => {
                return res.status(200).send({ status: 1, message: 'Successfully deleted' })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: 'Something failed!' });
            })
        }).catch(err => console.log(err))
    }).catch(err => {
        console.log(err)
    })
}