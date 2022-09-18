const query = require('../config/db')

module.exports.addBestSeller = async (req, res) => {
    try {
        let { productID } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS best_seller (id INT AUTO_INCREMENT PRIMARY KEY,productID int ,FOREIGN KEY (productID) REFERENCES product(id),isActive BOOLEAN)";
        await query(sql).then(async response => {
            let sql = "INSERT INTO best_seller (productID,isActive) VALUES ?";
            let values = [[productID, 1]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ status: 1, message: 'Best seller Added' })
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

module.exports.getBestSellerProduct = async (req, res) => {
    let productID = req.params.id
    let sql = "SELECT * FROM best_seller INNER JOIN product ON best_seller.productID=product.id WHERE productID=?"
    await query(sql, [productID]).then(async response => {
        return res.status(200).send({ response })
    }).catch(err => {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    })
}

module.exports.getBestSeller = async (req, res) => {
    let productID = req.params.id
    let sql = "SELECT * FROM best_seller WHERE isActive=1"
    await query(sql, [productID]).then(async response => {
        return res.status(200).send({ response })
    }).catch(err => {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    })
}

module.exports.getBestSellerAdmin = async (req, res) => {
    let productID = req.params.id
    let sql = "SELECT * FROM best_seller WHERE isActive=1 OR isActive=0"
    await query(sql, [productID]).then(async response => {
        return res.status(200).send({ response })
    }).catch(err => {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    })
}


module.exports.deleteBestSeller = async (req, res) => {
    try {
        let productID = req.params.id
        let sql = "DELETE FROM best_seller WHERE id = ?"
        await query(sql, [productID]).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully deleted' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.editActiveStatus = async (req, res) => {
    try {
        let { activeStatus, id } = req.body
        let sql = "UPDATE best_seller SET isActive = " + activeStatus + " WHERE id = " + id + "";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}