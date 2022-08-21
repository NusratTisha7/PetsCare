const query = require('../config/db')

module.exports.addReview = async (req, res) => {
    try {
        let { rating, review, userID, type } = req.body

        let petID = null, productID = null;
        if (req.body.petID) {
            petID = req.body.petID
        }
        if (req.body.productID) {
            productID = req.body.productID
        }
        let sql = "CREATE TABLE IF NOT EXISTS reviews (id INT AUTO_INCREMENT PRIMARY KEY, rating int, review VARCHAR(255), productID int, userID int, FOREIGN KEY (productID) REFERENCES product(id),FOREIGN KEY (userID) REFERENCES user(id),petID int ,FOREIGN KEY (petID) REFERENCES pet(id),type VARCHAR(255))";
        await query(sql).then(async response => {
            let sql = "INSERT INTO reviews (rating, review, productID, petID,userID,type) VALUES ?";
            let values = [[rating, review, productID, petID, userID, type]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ status: 1, message: 'Review Added successfully' })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: 'Something failed!' });
            })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    }
}


module.exports.getReviews = async (req, res) => {
    console.log("SSS")
    try {
        let sql = `SELECT * FROM reviews WHERE ${req.body.searchTrm} = ?`;
        await query(sql, [req.body.value]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    }
}

