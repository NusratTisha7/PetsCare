const conn = require('../config/db')

module.exports.addNewProduct = async (req, res) => {
    try {
        let { name, description, price, details, productCategory } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS product (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), price int, details VARCHAR(255), productCategory int, FOREIGN KEY (productCategory) REFERENCES product_category(id),ProductImage VARCHAR(255))";
        conn.query(sql, function (err, result) {
            if (err) throw err;
            let sql = "INSERT INTO product (name, description, price, details,productCategory,ProductImage) VALUES ?";
            let values = [[name, description, price, details, productCategory, `${req.file.filename}`]]
            conn.query(sql, [values], function (err, result) {
                if (err) return res.status(400).send({ message: 'Something failed!' });
                return res.status(200).send({ message: 'New product added successfully' })
            })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getAllProducts = async (req, res) => {
    try {
        let sql = "SELECT * FROM product";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getOneProduct = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM product where id = ?";
        conn.query(sql, [productId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.sortByCategory = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM product where productCategory = ?";
        conn.query(sql, [productId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}