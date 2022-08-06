const conn = require('../config/db')

module.exports.addCartItem = async (req, res) => {
    try {
        let { userID, productID, price, count } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS cart (id INT AUTO_INCREMENT PRIMARY KEY, price int, count int, userID int, FOREIGN KEY (userID) REFERENCES users(id),productID int, FOREIGN KEY (productID) REFERENCES product(id))";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            let sql = "INSERT INTO cart (userID,productID,price,count) VALUES ?";
            let values = [[userID, productID, price, count]]
            conn.query(sql, [values], function (err, result) {
                if (err) return res.status(400).send({ message: 'Something failed!' });
                return res.status(200).send({ message: 'Added to cart successfully!' })
            })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getCartItem = async (req, res) => {
    try {
        let userId = req.params.id
        let sql = "SELECT * FROM cart WHERE userID = ?";
        conn.query(sql, [userId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updateCartItem = async (req, res) => {
    try {
        let { count, cartID } = req.body
        let sql = "UPDATE cart SET count = " + count + " WHERE id = ?";
        conn.query(sql, [cartID], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send({ message: 'Successfully updated' })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deleteCartItem = async (req, res) => {
    try {
        let cartId = req.params.id
        let sql = "DELETE FROM cart WHERE id = ?"
        conn.query(sql, [cartId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send({ message: 'Successfully deleted' })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

