const query = require('../config/db')

module.exports.createProductCategory = async (req, res) => {
    try {
        let { name } = req.body
        let createdBy = req.user.result.id
        let sql = "CREATE TABLE IF NOT EXISTS product_category (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),createdBy int ,FOREIGN KEY (createdBy) REFERENCES user(id))";
        await query(sql).then(async response => {
            let sql = "INSERT INTO product_category (name,createdBy) VALUES ?";
            let values = [[name, createdBy]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ status: 1, message: 'Product category created successfully' })
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

module.exports.getAll = async (req, res) => {
    try {
        let sql = "SELECT * FROM product_category";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.editProductCategory = async (req, res) => {
    try {
        let id = req.params.id
        let updateData = req.body
        let sql = "UPDATE product_category SET ? WHERE id= ?";
        await query(sql, [updateData, id]).then(response => {
            return res.status(200).send({ status: 1, message: 'Product category updated successfully' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.deleteProductCategory = async (req, res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM product_category WHERE id = ?"
        await query(sql, [id]).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully deleted' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}