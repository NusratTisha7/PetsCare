const query = require('../config/db')

module.exports.product = async (req, res) => {
    try {
        let userId = req.user.result.id
        let sql = "SELECT * FROM orders WHERE userID = ?";
        await query(sql, [userId]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.pet = async (req, res) => {
    try {
        let userId = req.user.result.id
        let sql = "SELECT * FROM adoption WHERE userID = ?";
        await query(sql, [userId]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.treatment = async (req, res) => {
    try {
        let userId = req.user.result.id
        let sql = "SELECT * FROM adoption WHERE userID = ?";
        await query(sql, [userId]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.hotel = async (req, res) => {
    try {
        let userId = req.user.result.id
        let sql = "SELECT * FROM hotel WHERE userID = ?";
        await query(sql, [userId]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

