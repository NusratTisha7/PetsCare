const query = require('../config/db')

module.exports.addNewPet = async (req, res) => {
    try {
        let createdBy = req.user.result.id
        let { name, types, breed, birthDate, gender, weight, description } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS pet (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), petCategoryID int, FOREIGN KEY (petCategoryID) REFERENCES pet_category(id), breed VARCHAR(255), birthDate VARCHAR(255),gender VARCHAR(255),weight VARCHAR(255),description TEXT, petImage VARCHAR(255),createdBy int ,FOREIGN KEY (createdBy) REFERENCES user(id),isActive BOOLEAN)";
        await query(sql).then(async response => {
            let sql = "INSERT INTO pet (name,petCategoryID,breed,birthDate,gender,weight,description,petImage,createdBy,isActive) VALUES ?";
            let values = [[name, types, breed, birthDate, gender, weight, description, `${req.file.filename}`, createdBy,1]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ status: 1, message: 'New pet added successfully' })
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

module.exports.getAllPets = async (req, res) => {
    try {
        let sql = "SELECT * FROM pet WHERE isActive=1";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.getAllPetsAdmin = async (req, res) => {
    try {
        let limit = 10
        let offset = limit * req.params.page
        let sql = "SELECT * FROM pet LIMIT "+limit+" OFFSET "+offset+"";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.getOnePet = async (req, res) => {
    try {
        let petId = req.params.id
        let sql = "SELECT * FROM pet where id = ?"
        await query(sql, [petId]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.editPet = async (req, res) => {
    try {
        let id = req.params.id
        if (req.body.petCategoryID) {
            return res.status(400).send({ status: 0, message: 'Pet type can not be edited!' });
        }
        let updateData = req.body
        if (req.file) {
            updateData.PetImage = req.file.filename
        }
        let sql = "UPDATE pet SET ? WHERE id= ?";
        await query(sql, [updateData, id]).then(response => {
            return res.status(200).send({ status: 1, message: 'Pet updated successfully' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.deletePet = async (req, res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM pet WHERE id = ?"
        await query(sql, [id], function (err, result) {
            if (err) return res.status(400).send({ status: 0, message: 'Something failed!' });
            return res.status(200).send({ status: 1, message: 'Successfully deleted' })
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.editActiveStatus = async (req, res) => {
    try {
        let { activeStatus,id } = req.body
        let sql = "UPDATE pet SET isActive = " + activeStatus + " WHERE id = "+id+"";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}