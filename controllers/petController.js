const conn = require('../config/db')

module.exports.addNewPet = async (req, res) => {
    try {
        let { name, types, breed, birthDate, gender, weight, description } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS pet (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), types int, FOREIGN KEY (types) REFERENCES pet_category(id), breed VARCHAR(255), birthDate VARCHAR(255),gender VARCHAR(255),weight VARCHAR(255),description VARCHAR(255), PetImage VARCHAR(255))";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            let sql = "INSERT INTO pet (name,types,breed,birthDate,gender,weight,description,PetImage) VALUES ?";
            let values = [[name, types, breed, birthDate, gender, weight, description, `${req.file.filename}`]]
            conn.query(sql, [values], function (err, result) {
                if (err) return res.status(400).send({ message: 'Something failed!' });
                return res.status(200).send({ message: 'New pet added successfully' })
            })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getAllPets = async (req, res) => {
    try {
        let sql = "SELECT * FROM pet";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getOnePet = async (req, res) => {
    try {
        let petId = req.params.id
        let sql = "SELECT * FROM pet where id = ?";
        conn.query(sql, [petId], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.editPet = async (req, res) => {
    try {
        let id = req.params.id
        if(req.body.types){
            return res.status(400).send({ message: 'Pet type can not be edited!' });
        }
        let updateData = req.body
        if(req.file){
            updateData.PetImage = req.file.filename
        }
        let sql = "UPDATE pet SET ? WHERE id= ?";
        conn.query(sql, [updateData, id], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send({ message: 'Pet updated successfully' })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deletePet = async (req, res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM pet WHERE id = ?"
        conn.query(sql, [id], function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send({ message: 'Successfully deleted' })
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}