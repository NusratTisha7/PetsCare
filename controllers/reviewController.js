const query = require('../config/db')

module.exports.addReview = async (req, res) => {
    try {
        let { rating, review, profileID, type } = req.body

        let petID = null, productID = null;
        if (req.body.petID) {
            petID = req.body.petID
        }
        if (req.body.productID) {
            productID = req.body.productID
        }
        let sql = "CREATE TABLE IF NOT EXISTS reviews (id INT AUTO_INCREMENT PRIMARY KEY, rating int, review TEXT, productID int, profileID int, FOREIGN KEY (productID) REFERENCES product(id),FOREIGN KEY (profileID) REFERENCES profile(id),petID int ,FOREIGN KEY (petID) REFERENCES pet(id),type VARCHAR(255),isActive BOOLEAN)";
        await query(sql).then(async response => {
            let sql = "INSERT INTO reviews (rating, review, productID, petID,profileID,type,isActive) VALUES ?";
            let values = [[rating, review, productID, petID, profileID, type,1]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ status: 1, message: 'Review Added successfully' })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: 'Something failed!' });
            })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    }
}


module.exports.getReviews = async (req, res) => {
    try {
        let sql = `SELECT * FROM reviews WHERE ${req.body.searchTrm} = ? AND isActive=1`;
        await query(sql, [req.body.value]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    }
}

module.exports.getReviewsAdmin = async (req, res) => {
    try {
        let limit = 10
        let offset = limit * req.params.page
        let sql = `SELECT * FROM reviews WHERE ${req.body.searchTrm} = ? LIMIT ${limit} OFFSET ${offset}`;
        await query(sql, [req.body.value]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, message: 'Something failed!' });
    }
}

module.exports.editAddressStatus = async (req, res) => {
    try {
        let { activeStatus,id } = req.body
        let sql = "UPDATE reviews SET isActive = " + activeStatus + " WHERE id = "+id+"";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

