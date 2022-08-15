const query = require('../config/db')

module.exports.addNewBrand = async (req, res) => {
    try {
        let { name } = req.body
        let createdBy = req.user.result.id
        let sql = "CREATE TABLE IF NOT EXISTS brand (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),createdBy int ,FOREIGN KEY (createdBy) REFERENCES user(id))";
        await query(sql).then(async response => {
            let sql = "INSERT INTO brand (name,createdBy) VALUES ?";
            let values = [[name, createdBy]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ message: 'Brand Added successfully' })
            }).catch(err => {
                return res.status(400).send({ message: 'Something failed!' });
            })
        }).catch(err => {
            return res.status(400).send({ message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getAllBrandItem = async (req, res) => {
    try {
        let sql = "SELECT * FROM brand";
        await query(sql).then(response => {
            return res.status(200).send(response)
        }).catch(err => {
            return res.status(400).send({ message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.editBrand = async (req, res) => {
    try {
        let brandId = req.params.id
        let updateData = req.body
        let sql = "UPDATE brand SET ? WHERE id= ?";
        await query(sql, [updateData, brandId]).then(response => {
            return res.status(200).send({ message: 'Brand updated successfully' })
        }).catch(err => {
            return res.status(400).send({ message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deleteBrand = async (req, res) => {
    try {
        let brandId = req.params.id
        let sql = "DELETE FROM brand WHERE id = ?"
        await query(sql, [brandId]).then(response => {
            return res.status(200).send({ message: 'Successfully deleted' })
        }).catch(err => {
            return res.status(400).send({ message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}