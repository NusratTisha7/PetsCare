const conn = require('../config/db')

module.exports.createPetCategory = async (req, res) => {
    try {
        let { name } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS pet_category (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            let sql = "INSERT INTO pet_category (name) VALUES ?";
            let values = [[name]]
            conn.query(sql, [values], function (err, result) {
                if (err) return res.status(400).send({ message: 'Something failed!' });
                return res.status(200).send({ message: 'Pet category created successfully' })
            })
        });
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getAll = async (req, res) => {
    try {
        let sql = "SELECT * FROM pet_category";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
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
        conn.query(sql, [updateData, id], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send({ message: 'Pet category updated successfully' })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deletePetCategory = async (req, res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM pet_category WHERE id = ?"
        conn.query(sql, [id], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send({ message: 'Successfully deleted' })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}