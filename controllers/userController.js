const conn = require('../config/db')
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");

const findUser = async (email, callBack) => {
    let sql = "SELECT * FROM users WHERE email = ?"
    conn.query(sql, [email], async function (err, result) {
        if (err) {
            callBack(err);
        }
        return callBack(null, result[0]);
    })
}

module.exports.signIn = async (req, res) => {
    let { email, password } = req.body
    findUser(email, async (err, result) => {
        if (err) return res.status(400).send({ message: 'Something failed!' });
        if (result) {
            const chekPass = await bcrypt.compare(password, result.password);
            if (chekPass) {
                const jsontoken = sign({ result: result }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).send({
                    message: 'Login Succssful!',
                    token: jsontoken,
                })
            } else {
                return res.status(200).send({ message: 'Invlaid email or password' })
            }

        } else {
            return res.status(200).send({ message: 'Email does not exists!' })
        }
    })
}

module.exports.signUp = async (req, res) => {
    let { email, password, phone, address } = req.body
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255), phone VARCHAR(255), address VARCHAR(255))";
    conn.query(sql, function (err, result) {
        if (err) return res.status(400).send({ message: 'Something failed!' });
        findUser(email, async (err, result) => {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            if (result) {
                return res.status(200).send({ message: 'Email already exists!' })
            }
            else {
                let sql = "INSERT INTO users (email, password, phone, address) VALUES ?";
                let values = [[email, password, phone, address]]
                conn.query(sql, [values], function (err, result) {
                    if (err) throw err;
                    return res.status(200).send({ message: 'User Created Successfully' })
                })
            }
        })
    });
}