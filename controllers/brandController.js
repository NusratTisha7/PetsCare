const conn = require('../config/db')

module.exports.addNewBrand = async (req, res) => {
    try {
        let { name } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS brand (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            let sql = "INSERT INTO brand (name) VALUES ?";
            let values = [[name]]
            conn.query(sql, [values], function (err, result) {
                if (err) return res.status(400).send({ message: 'Something failed!' });
                return res.status(200).send({ message: 'Brand Added successfully' })
            })
        });
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getAllBrandItem = async (req, res) => {
    try {
        let sql = "SELECT * FROM brand";
        conn.query(sql, function (err, result) {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}