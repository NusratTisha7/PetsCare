const query = require('../config/db')

module.exports.adaption = async (values) => {
    let { prevOwnPet, adoptReason, totalAmount } = values.body
    let { tranId, sessionkey, userId } = values
    let sql = "CREATE TABLE IF NOT EXISTS adoption (id INT AUTO_INCREMENT PRIMARY KEY, prevOwnPet BOOLEAN,adoptReason VARCHAR(255), transactionID  VARCHAR(255), sessionkey VARCHAR(255),userID int, FOREIGN KEY (userID) REFERENCES user(id),totalAmount int, paymentStatus VARCHAR(255), validationId VARCHAR(255))";
    await query(sql).then(async response => {
        let sql = "INSERT INTO adoption (prevOwnPet,adoptReason,totalAmount,transactionID,sessionkey,userID) VALUES ?";
        let value = [[prevOwnPet, adoptReason, totalAmount, tranId, sessionkey, userId]]
        await query(sql, [value]).then(res => console.log(res)).catch(err => console.log(err))
    }).catch(err => {
        console.log(err)
    })
}