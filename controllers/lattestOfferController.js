const query = require('../config/db')
const _ = require('lodash');

module.exports.addNewOffer = async (req, res) => {
    try {
        let { title, description, subTitle } = req.body

        let categoryID = null, productID = null;
        if (req.body.categoryID) {
            categoryID = req.body.categoryID
        }
        if (req.body.productID) {
            productID = req.body.productID
        }
        let sql = "CREATE TABLE IF NOT EXISTS latest_offer (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255),subTitle VARCHAR(255), description VARCHAR(255), image VARCHAR(255), productID int, FOREIGN KEY (productID) REFERENCES product(id), categoryID int, FOREIGN KEY (categoryID) REFERENCES product_category(id),isActive BOOLEAN)";
        await query(sql).then(async response => {
            let sql = "INSERT INTO latest_offer (title,subTitle, description, ProductID,categoryID,image,isActive) VALUES ?";
            let values = [[title, subTitle, description, productID, categoryID, `${req.file.filename}`, 1]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ status: 1, message: 'Offer added successfully' })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: 'Something failed!' });
            })

        }).catch(err => {
            return res.status(400).send({ message: err });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' })
    }
}

module.exports.editOffer = async (req, res) => {
    try {
        let productId = req.params.id
        let updateData = req.body
        if (req.file) {
            updateData.image = req.file.filename
        }
        let sql = "UPDATE latest_offer SET ? WHERE id= ?";
        await query(sql, [updateData, productId]).then(response => {
            return res.status(200).send({ status: 1, message: 'Offer updated successfully' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' })
    }
}

module.exports.getAllOffer = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM latest_offer";
        await query(sql, [productId]).then(response => {
            return res.status(200).send({ response, status: 1, })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' })
    }
}

module.exports.getOneOfferProduct = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM latest_offer WHERE productID = ?";
        await query(sql, [productId]).then(response => {
            return res.status(200).send({ response, status: 1, })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' })
    }
}

module.exports.getOneOfferCategory = async (req, res) => {
    try {
        let categoryId = req.params.id
        let sql = "SELECT * FROM latest_offer WHERE categoryID = ?";
        await query(sql, [categoryId]).then(response => {
            return res.status(200).send({ response, status: 1, })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' })
    }
}

module.exports.deleteOffer = async (req, res) => {
    try {
        let offerId = req.params.id
        let sql = "DELETE FROM latest_offer WHERE id = ?"
        await query(sql, [offerId]).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully deleted' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' })
    }
}

module.exports.editActiveStatus = async (req, res) => {
    try {
        let { activeStatus, id } = req.body
        let sql = "UPDATE latest_offer SET isActive = " + activeStatus + " WHERE id = " + id + "";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}



