const query = require('../config/db')

module.exports.hotel = async (values, callBack) => {
    console.log(values)
    let { petId, checkIn, checkOut, type, addTreatment } = values.body
    let { tranId, sessionkey, cashOn, totalAmount } = values
    let address = JSON.stringify(values.address);
    let userData = JSON.stringify(values.userData);

    let sql = "CREATE TABLE IF NOT EXISTS hotel (id INT AUTO_INCREMENT PRIMARY KEY, transactionID  VARCHAR(255), sessionkey VARCHAR(255),userData VARCHAR(255),totalAmount int,petID int, FOREIGN KEY (petID) REFERENCES pet(id),type VARCHAR(255),checkIn VARCHAR(255), checkOut VARCHAR(255),paymentStatus VARCHAR(255),isActive BOOLEAN,cashOn BOOLEAN,orderStatus VARCHAR(255),address VARCHAR(255),addTreatment VARCHAR(255))";
    await query(sql).then(async response => {
        let sql = "INSERT INTO hotel (totalAmount,transactionID,sessionkey,userData,petID, type, checkIn, checkOut,isActive,cashOn,orderStatus,address,addTreatment) VALUES ?";
        let value = [[totalAmount, tranId, sessionkey, userData, petId, type, checkIn, checkOut, 1, cashOn, 'Order Placed', address, addTreatment]]
        await query(sql, [value]).then(res => callBack(null, res)).catch(err => callBack(err))
    }).catch(err => {
        console.log(err)
    })
}