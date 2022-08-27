const query = require('../config/db')
const { mail } = require('../sendMail/mail');

module.exports.hotelBook = async (req, res) => {
    try {
        let email = req.user.result.email
        let pNO = req.user.result.phone
        let { name, phone, reservationDate, reservationTime } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS hotel_book (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),phone VARCHAR(255),reservationDate VARCHAR(255),reservationTime VARCHAR(255),isActive BOOLEAN)";
        await query(sql).then(async response => {
            let sql = "INSERT INTO hotel_book (name, phone, reservationDate, reservationTime,isActive) VALUES ?";
            let values = [[name, phone, reservationDate, reservationTime, 1]]
            await query(sql, [values]).then(response => {
                
                let otp = Math.floor(100000 + Math.random() * 900000)
                let text = '<h1>New Hotel Booking</h1><br/><p>Email: '+email+'</p><p>Phone: '+pNO+'</p>'
                mail(email,otp,text,(otpResult) => {
                    console.log("otpResult",otpResult)
                })
                return res.status(200).send({ status: 1, message: 'Hotel Booked successfully!' })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: 'Something failed!' });
            })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}