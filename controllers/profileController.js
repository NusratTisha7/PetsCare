const query = require('../config/db')

module.exports.createProfile = async (values) => {
    let { registrationID, email, phone, address } = values
    let firstName, lastName, gender, profileImage = null
    let sql = "CREATE TABLE IF NOT EXISTS profile (profileID INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), firstName VARCHAR(255), lastName VARCHAR(255), gender VARCHAR(255), profileImage VARCHAR(255),registrationID int ,FOREIGN KEY (registrationID) REFERENCES user(id), isActive BOOLEAN)";
    await query(sql).then(response => {
        let sql = "INSERT INTO profile (email, phone, address, firstName,lastName,gender,profileImage,registrationID,isActive) VALUES ?";
        let values = [[email, phone, address, firstName, lastName, gender, profileImage, registrationID,1]]
        query(sql, [values])
    }).catch(err => {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    })
}

module.exports.getProfile = async (req, res) => {
    try {
        let userId = req.params.id

        if (parseInt(userId) === req.user.result.id) {
            let sql = "SELECT * FROM profile where registrationID = ?";
            await query(sql, [userId]).then(response => {
                return res.status(200).send({ response, status: 1 })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: 'Something failed!' });
            })
        } else {
            return res.status(400).send({ status: 0, message: 'Access denied' })
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.editProfile = async (req, res) => {
    try {
        console.log(req.body)
        let userId = req.params.id
        if (parseInt(userId) === req.user.result.id) {
            let updateData = req.body
            if (req.file) {
                updateData.profileImage = req.file.filename
            }
            let sql = "UPDATE profile SET ? WHERE registrationID= ?";
            query(sql, [updateData, userId]).then(response => {
                return res.status(200).send({ status: 1, message: 'Profile updated successfully' })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: 'Something failed!' });
            })

        } else {
            return res.status(400).send({ status: 0, message: 'Access denied' })
        }

    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.addAddress = async (req, res) => {
    let profileID = req.params.id
    let userID = req.user.result.id
    let { name, phone, city, zip, address, type } = req.body
    let sql = "CREATE TABLE IF NOT EXISTS address (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), city VARCHAR(255), zip VARCHAR(255), type VARCHAR(255),profileID int ,FOREIGN KEY (profileID) REFERENCES profile(id),userID int ,FOREIGN KEY (userID) REFERENCES user(id),isActive BOOLEAN)";
    await query(sql).then(response => {
        let sql = "INSERT INTO address (name,phone,city,zip,address,type,profileID,userID,isActive) VALUES ?";
        let values = [[name, phone, city, zip, address, type, profileID, userID,1]]
        query(sql, [values]).then(response => {
            return res.status(200).send({ status: 1, message: 'Address added successfully' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    }).catch(err => {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    })
}

module.exports.getAddress = async (req, res) => {
    try {
        let profileId = req.params.id
        let sql = "SELECT * FROM address where profileID = ?";
        query(sql, [profileId]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.deleteAddress = async (req, res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM address WHERE id = ?"
        query(sql, [id]).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully deleted' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.editActiveStatus = async (req, res) => {
    try {
        let { activeStatus,id } = req.body
        let sql = "UPDATE profile SET isActive = " + activeStatus + " WHERE id = "+id+"";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.editAddressStatus = async (req, res) => {
    try {
        let { activeStatus,id } = req.body
        
        let sql = "UPDATE address SET isActive = " + activeStatus + " WHERE id = "+id+"";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}