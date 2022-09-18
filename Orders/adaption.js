const query = require('../config/db')

module.exports.adaption = async (values, callBack) => {
    let { prevOwnPet, adoptReason } = values.body
    let { tranId, sessionkey, userId, cashOn, pet, totalAmount } = values
    let petItem = JSON.stringify(pet);
    let address = JSON.stringify(values.address);
    let userData = JSON.stringify(values.userData);
    
    let sql = "CREATE TABLE IF NOT EXISTS adoption (id INT AUTO_INCREMENT PRIMARY KEY,petItem VARCHAR(255), prevOwnPet BOOLEAN,adoptReason VARCHAR(255), transactionID  VARCHAR(255), sessionkey VARCHAR(255),userData VARCHAR(255),totalAmount int, paymentStatus VARCHAR(255),isActive BOOLEAN,cashOn BOOLEAN,orderStatus VARCHAR(255),deliveryStatus VARCHAR(255),address VARCHAR(255))";
    await query(sql).then(async response => {
        let sql = "INSERT INTO adoption (prevOwnPet,petItem,adoptReason,totalAmount,transactionID,sessionkey,userData,isActive,cashOn,orderStatus,deliveryStatus,address) VALUES ?";
        let value = [[prevOwnPet, petItem, adoptReason, totalAmount, tranId, sessionkey, userData, 1, cashOn, 'Order placed', null, address]]
        await query(sql, [value]).then(res => {
            callBack(null, res)
        }).catch(err => {
            callBack(err)
        })
    }).catch(err => {
        console.log(err)
    })
}