const query = require('../config/db')

module.exports.treatment = async (values, callBack) => {
    console.log(values)
    let { petId, treatment, type, date } = values.body
    let { tranId, sessionkey, userId, cashOn, totalAmount } = values

    let address = JSON.stringify(values.address);
    let userData = JSON.stringify(values.userData);

    console.log("userData",userData)

    let sql = "CREATE TABLE IF NOT EXISTS treatment (id INT AUTO_INCREMENT PRIMARY KEY, transactionID  VARCHAR(255), sessionkey VARCHAR(255),userData VARCHAR(255),totalAmount int,petID int, FOREIGN KEY (petID) REFERENCES pet(id),treatment VARCHAR(255),type VARCHAR(255),date VARCHAR(255),paymentStatus VARCHAR(255),isActive BOOLEAN, cashOn BOOLEAN,orderStatus VARCHAR(255),address VARCHAR(255))";
    await query(sql).then(async response => {
        let sql = "INSERT INTO treatment (totalAmount,transactionID,sessionkey,userData,petID, treatment, type, date,isActive,cashOn,address,orderStatus) VALUES ?";
        let value = [[totalAmount, tranId, sessionkey, userData, petId, treatment, type, date, 1, cashOn, address, 'Order Placed']]
        await query(sql, [value]).then(res => {
            callBack(null, res)
        }).catch(err => callBack(err))
    }).catch(err => {
        console.log(err)
    })
}