const nodemailer = require('nodemailer')

module.exports.mail = async (email, otp, text,callBack) => {
    try {
        const mail = nodemailer.createTransport({
            host: process.env.MAILHOST,
           port: process.env.MAILPORT,
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAILPASS
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Pet Food OTP',
            html: text,
        };

        mail.sendMail(mailOptions, async function (err, info) {
            if (err) {
                callBack({ msg: err, status: 400, sts: 0 })
            } else {
                callBack({ msg: 'OTP send successfully', status: 200, sts: 1 })
            }
        })
    } catch (e) {
        callBack({ msg: e, status: 400, sts: 0 })
    }
}