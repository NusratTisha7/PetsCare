const query = require('../config/db')

module.exports.orderStatus = async (req, res) => {
    try {
        let { field, status, table, id } = req.body
        let sql = `UPDATE ${table} SET ${field} =  '${status}' WHERE id = ${id}`;
        console.log(sql)
        await query(sql, [id]).then(response => {
            return res.status(200).send({ status: 1, message: `${field} Status updated` })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: err });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}