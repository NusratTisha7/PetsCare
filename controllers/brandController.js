const query = require('../config/db')

module.exports.addNewBrand = async (req, res) => {
    try {
        let { name } = req.body
        let createdBy = req.user.result.id
        let sql = "CREATE TABLE IF NOT EXISTS brand (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),createdBy int ,FOREIGN KEY (createdBy) REFERENCES user(id),isActive BOOLEAN)";
        await query(sql).then(async response => {
            let sql = "INSERT INTO brand (name,createdBy,isActive) VALUES ?";
            let values = [[name, createdBy,1]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ status: 1, message: 'Brand Added successfully' })
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

module.exports.getAllBrandItem = async (req, res) => {
    try {
        let sql = "SELECT * FROM brand";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.editBrand = async (req, res) => {
    try {
        let brandId = req.params.id
        let updateData = req.body
        let sql = "UPDATE brand SET ? WHERE id= ?";
        await query(sql, [updateData, brandId]).then(response => {
            return res.status(200).send({ status: 1, message: 'Brand updated successfully' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.deleteBrand = async (req, res) => {
    try {
        let brandId = req.params.id
        let sql = "DELETE FROM brand WHERE id = ?"
        await query(sql, [brandId]).then(response => {
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
        let { activeStatus,id } = req.body
        let sql = "UPDATE brand SET isActive = " + activeStatus + " WHERE id = "+id+"";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}