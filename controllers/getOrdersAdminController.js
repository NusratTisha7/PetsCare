const query = require('../config/db')

module.exports.productAdmin = async (req, res) => {
    try {
        let limit = 10
        let offset = limit * req.params.page
        let sql = "SELECT * FROM orders WHERE isActive=1 OR isActive=0 LIMIT "+limit+" OFFSET "+offset+"";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.petAdmin = async (req, res) => {
    try {
        let limit = 10
        let offset = limit * req.params.page
        let sql = "SELECT * FROM adoption WHERE isActive=1 OR isActive=0 LIMIT "+limit+" OFFSET "+offset+"";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.treatmentAdmin = async (req, res) => {
    try {
        let limit = 10
        let offset = limit * req.params.page
        let sql = "SELECT * FROM treatment WHERE isActive=1 OR isActive=0 LIMIT "+limit+" OFFSET "+offset+"";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.hotelAdmin = async (req, res) => {
    try {
        let limit = 10
        let offset = limit * req.params.page
        let sql = "SELECT * FROM hotel WHERE isActive=1 OR isActive=0 LIMIT "+limit+" OFFSET "+offset+"";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}
