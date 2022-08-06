const conn = require('../config/db')

module.exports.addNewProduct = async (req, res) => {
    try {
        let { name, description, price, details, brandID, productCategory } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS product (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), price int, details VARCHAR(255), productCategory int, FOREIGN KEY (productCategory) REFERENCES product_category(id), brandID int, ProductImage VARCHAR(255),FOREIGN KEY (brandID) REFERENCES brand(id))";
        conn.query(sql, function (err, result) {
            if (err) res.status(400).send({ message: 'Something failed!' });
            let sql = "INSERT INTO product (name, description, price, details,productCategory,brandID,ProductImage) VALUES ?";
            let values = [[name, description, price, details, productCategory, brandID, `${req.file.filename}`]]
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
        let sql = "SELECT * FROM product WHERE id = ?";
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
        let sql = "SELECT * FROM product WHERE productCategory = ?";
        conn.query(sql, [productId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.sortProduct = async (req, res) => {
    try {
        let sql;
        switch (req.body.sort) {
            case "1":
                sql = "SELECT * FROM product ORDER BY id DESC";
                break;
            case "2":
                sql = "";
                break;
            case "3":
                sql = "SELECT * FROM product ORDER BY price ";
                break;
            case "4":
                sql = "SELECT * FROM product ORDER BY price DESC";
                break;
        }
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.searchProduct = async (req, res) => {
    try {
        let serachTerm = req.body.serachTerm;
        let sql = "SELECT * FROM product WHERE name LIKE '%" + serachTerm + "%'"
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.filterProduct = async (req, res) => {
    try {
        let sql;
        if (req.body.brand) {
            let brandList = req.body.brand
            let str = '';
            for (let i = 0; i < brandList.length; i++) {
                if (i === brandList.length - 1) {
                    str = str + `'${brandList[i]}'`
                } else {
                    str = str + `'${brandList[i]}',`
                }
            }
            sql = "SELECT * from product where `brand` in  (" + str + ") AND price BETWEEN " + req.body.start + " AND " + req.body.end + ""
        } else {
            sql = "SELECT * from product where price BETWEEN " + req.body.start + " AND " + req.body.end + ""
        }
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}