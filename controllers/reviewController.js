const conn = require('../config/db')

module.exports.addProductReview = async (req, res) => {
    try {
        let { rating, review, userID } = req.body

        let petID = null, productID = null;
        if (req.body.petID) {
            petID = req.body.petID
        }
        if (req.body.productID) {
            productID = req.body.productID
        }
        let sql = "CREATE TABLE IF NOT EXISTS reviews (id INT AUTO_INCREMENT PRIMARY KEY, rating int, review VARCHAR(255), productID int, userID int, FOREIGN KEY (productID) REFERENCES product(id),FOREIGN KEY (userID) REFERENCES users(id),petID int ,FOREIGN KEY (petID) REFERENCES pet(id))";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            let sql = "INSERT INTO reviews (rating, review, productID, petID,userID) VALUES ?";
            let values = [[rating, review, productID, petID, userID]]
            conn.query(sql, [values], function (err, result) {
                if (err) return res.status(400).send({ message: 'Something failed!' });
                return res.status(200).send({ message: 'Review Added successfully' })
            })
        });
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getProductReviews = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM reviews WHERE productID = ?";
        conn.query(sql, [productId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.getPetReviews = async (req, res) => {
    try {
        let petId = req.params.id
        let sql = "SELECT * FROM reviews WHERE petID = ?";
        conn.query(sql, [petId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}