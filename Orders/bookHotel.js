const query = require('../config/db')

module.exports.hotel = async (values) => {
    console.log(values)
    let { petId, checkIn, checkOut, treatment, type, totalAmount } = values.body
    let { tranId, sessionkey, userId } = values
    let sql = "CREATE TABLE IF NOT EXISTS hotel (id INT AUTO_INCREMENT PRIMARY KEY, transactionID  VARCHAR(255), sessionkey VARCHAR(255),userID int, FOREIGN KEY (userID) REFERENCES user(id),totalAmount int,petID int, FOREIGN KEY (petID) REFERENCES pet(id),treatment VARCHAR(255),type VARCHAR(255),checkIn VARCHAR(255), checkOut VARCHAR(255))";
    await query(sql).then(async response => {
        let sql = "INSERT INTO hotel (totalAmount,transactionID,sessionkey,userID,petID, treatment, type, checkIn, checkOut) VALUES ?";
        let value = [[totalAmount, tranId, sessionkey, userId, petId, treatment, type, checkIn, checkOut]]
        await query(sql, [value]).then(res => console.log(res)).catch(err => console.log(err))
    }).catch(err => {
        console.log(err)
    })
}