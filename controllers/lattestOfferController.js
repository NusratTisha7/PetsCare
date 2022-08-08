const conn = require('../config/db')
const _ = require('lodash');

module.exports.addNewOffer = async (req, res) => {
    try {
        let { title, description } = req.body

        let categoryID = null, productID = null;
        if (req.body.categoryID) {
            categoryID = req.body.categoryID
        }
        if (req.body.productID) {
            productID = req.body.productID
        }
        let sql = "CREATE TABLE IF NOT EXISTS latest_offer (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description VARCHAR(255), image VARCHAR(255), productID int, FOREIGN KEY (productID) REFERENCES product(id), categoryID int, FOREIGN KEY (categoryID) REFERENCES product_category(id))";
        conn.query(sql, function (err, result) {
            if (err) res.status(400).send({ message: 'Something failed!' });
            let sql = "INSERT INTO latest_offer (title, description, ProductID,categoryID,image) VALUES ?";
            let values = [[title, description, productID, categoryID, `${req.file.filename}`]]
            conn.query(sql, [values], function (err, result) {
                if (err) return res.status(400).send({ message: 'Something failed!' });
                return res.status(200).send({ message: 'Offer added successfully' })
            })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.editOffer = async (req, res) => {
    try {
        let productId = req.params.id
        let updateData = req.body
        if(req.file){
            updateData.image = req.file.filename
        }
        let sql = "UPDATE latest_offer SET ? WHERE id= ?";
        conn.query(sql, [updateData,productId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send({ message: 'Offer updated successfully' })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getAllOffer = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM latest_offer";
        conn.query(sql, [productId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getOneOfferProduct = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM latest_offer WHERE productID = ?";
        conn.query(sql, [productId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getOneOfferCategory = async (req, res) => {
    try {
        let categoryId = req.params.id
        let sql = "SELECT * FROM latest_offer WHERE categoryID = ?";
        conn.query(sql, [categoryId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deleteOffer = async (req, res) => {
    try {
        let offerId = req.params.id
        let sql = "DELETE FROM latest_offer WHERE id = ?"
        conn.query(sql, [offerId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send({ message: 'Successfully deleted' })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}



