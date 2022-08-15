const query = require('../config/db')
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");
const { createProfile } = require('../controllers/profileController');
const nodemailer = require('nodemailer')


const findUser = async (email, callBack) => {
    try {
        let sql = "SELECT * FROM user WHERE email = ?"
        await query(sql, [email]).then(res => {
            callBack(null, res);
        }).catch(err => {
            callBack(err);
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}


const sendOTP = async (email, otp, callBack) => {
    try {
        const mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password Link',
            html: '<h1>Your OTP is : ' + otp + '</p>',
        };

        mail.sendMail(mailOptions, async function (err, info) {
            if (err) {
                callBack({ msg: 'Something failed!', status: 400 })
            } else {
                callBack({ msg: 'OTP send successfully', status: 200 })
            }
        })
    } catch (e) {
        callBack({ msg: 'Something failed!', status: 400 })
    }
}


module.exports.verifyUser = async (req, res) => {
    try {
        const { email, otp } = req.body
        findUser(email, async (err, result) => {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            if (result) {
                if (result.length === 0) {
                    return res.status(400).send({ message: 'User does not exist!' });
                } else {
                    if (result[0].otp == otp) {
                        let sql = "UPDATE user SET verified = " + 1 + " WHERE id = ?";
                        await query(sql, [result[0].id]).then(async response => {
                            let values = {
                                registrationID: result[0].id,
                                email: result[0].email,
                                phone: result[0].phone,
                                address: result[0].address
                            }
                            await createProfile(values)
                            let role = result[0].role.charAt(0).toUpperCase() + result[0].role.slice(1)
                            return res.status(200).send({ message: `${role} Created Successfully` })
                        }).catch(err => {
                            return res.status(400).send({ message: 'Something failed!' });
                        })
                    } else {
                        return res.status(400).send({ message: 'Invalid OTP!' });
                    }
                }
            }
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.resendOTP = async (req, res) => {
    try {
        let otp = Math.floor(100000 + Math.random() * 900000)
        sendOTP(req.body.email, otp, async (message) => {
            if (message.status == 200) {
                let sql = "UPDATE user SET otp = " + otp + " WHERE email = ?";
                await query(sql, [req.body.email]).then(async response => {
                    return res.status(200).send({ message: 'OTP resend successfully!' });
                })
            } else {
                return res.status(400).send({ message: 'Something failed!' });
            }

        })
    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.signIn = async (req, res) => {
    try {
        let { email, password } = req.body
        await findUser(email, async (err, result) => {
            if (err) return res.status(400).send({ message: 'Something failed!' });
            if (result[0]) {
                if (result[0].verified === 0) {
                    return res.status(400).send({ message: 'Please verify your email and complete registration' })
                } else {
                    const chekPass = await bcrypt.compare(password, result[0].password);
                    if (chekPass) {
                        const jsontoken = sign({ result: result[0] }, process.env.JWT_SECRET_KEY, {
                            expiresIn: "1h"
                        });
                        return res.status(200).send({
                            message: 'Login Succssful!',
                            token: jsontoken,
                        })
                    } else {
                        return res.status(400).send({ message: 'Invlaid email or password' })
                    }
                }


            } else {
                return res.status(400).send({ message: 'Email does not exists!' })
            }
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}


const signup = async (params, callBack) => {
    try {
        let { email, password, phone, address, role } = params

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        let otp = Math.floor(100000 + Math.random() * 900000)
        let verified = 0

        let sql = "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), password VARCHAR(255), phone VARCHAR(255), address VARCHAR(255),role VARCHAR(255),verified BOOLEAN,otp int)";
        await query(sql).then(response => {
            findUser(email, async (err, result) => {
                if (err) {
                    callBack({ message: 'Something failed!', status: 400 });
                }
                if (result[0]) {
                    callBack({ message: 'Email already exists!', status: 400 })
                }
                else {
                    let sql = "INSERT INTO user (email, password, phone, address, role,verified,otp) VALUES ?";
                    let values = [[email, password, phone, address, role, verified, otp]]
                    await query(sql, [values]).then(async response => {
                        await sendOTP(email, otp, (otpResult) => {
                            callBack({ message: otpResult.msg, status: otpResult.status });
                        })
                    }).catch(err => {
                        callBack({ message: 'Something failed!', status: 400 });
                    })
                }
            })
        }).catch(err => {
            callBack({ message: 'Something failed!', status: 400 });
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.createCustomer = async (req, res) => {
    try {
        let { email, password, phone, address } = req.body
        let params = {
            email, password, phone, address, role: 'customer'
        }
        await signup(params, (result) => {
            return res.status(result.status).send(result.message);
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.createAdmin = async (req, res) => {
    try {
        let { email, password, phone, address } = req.body
        let params = {
            email, password, phone, address, role: 'admin'
        }
        await signup(params, (result) => {
            return res.status(result.status).send(result.message);
        })
    } catch (err) {
        return res.status(400).send(err)
    }
}