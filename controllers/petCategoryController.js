const query = require('../config/db')

module.exports.createPetCategory = async (req, res) => {
    try {
        let { name } = req.body
        let createdBy = req.user.result.id
        let sql = "CREATE TABLE IF NOT EXISTS pet_category (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),createdBy int ,FOREIGN KEY (createdBy) REFERENCES user(id))";
        await query(sql).then(async response => {
            let sql = "INSERT INTO pet_category (name,createdBy) VALUES ?";
            let values = [[name, createdBy]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ message: 'Pet category created successfully' })
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

module.exports.getAll = async (req, res) => {
    try {
        let sql = "SELECT * FROM pet_category";
        await query(sql).then(response => {
            return res.status(200).send(response)
        }).catch(err => {
            return res.status(400).send({ message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.editPetCategory = async (req, res) => {
    try {
        let id = req.params.id
        let updateData = req.body
        let sql = "UPDATE pet_category SET ? WHERE id= ?";
        await query(sql, [updateData, id]).then(response => {
            return res.status(200).send({ message: 'Pet category updated successfully' })
        }).catch(err => {
            return res.status(400).send({ message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deletePetCategory = async (req, res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM pet_category WHERE id = ?"
        await query(sql, [id]).then(response => {
            return res.status(200).send({ message: 'Successfully deleted' })
        }).catch(err => {
            return res.status(400).send({ message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}