const query = require('../config/db')

module.exports.treatment = async (values) => {
    console.log(values)
    let { petId, treatment, type, date, totalAmount } = values.body
    let { tranId, sessionkey, userId, cashOn } = values
    let sql = "CREATE TABLE IF NOT EXISTS treatment (id INT AUTO_INCREMENT PRIMARY KEY, transactionID  VARCHAR(255), sessionkey VARCHAR(255),userID int, FOREIGN KEY (userID) REFERENCES user(id),totalAmount int,petID int, FOREIGN KEY (petID) REFERENCES pet(id),treatment VARCHAR(255),type VARCHAR(255),date VARCHAR(255),paymentStatus VARCHAR(255), validationId VARCHAR(255),isActive BOOLEAN, cashOn BOOLEAN)";
    await query(sql).then(async response => {
        let sql = "INSERT INTO treatment (totalAmount,transactionID,sessionkey,userID,petID, treatment, type, date,isActive,cashOn) VALUES ?";
        let value = [[totalAmount, tranId, sessionkey, userId, petId, treatment, type, date, 1, cashOn]]
        await query(sql, [value]).then(res => console.log(res)).catch(err => console.log(err))
    }).catch(err => {
        console.log(err)
    })
}