const query = require('../config/db')
const PaymentSession = require("ssl-commerz-node").PaymentSession;
const { productOrder } = require('../Orders/productOrder');
const { adaption } = require('../Orders/adaption');
const { treatment } = require('../Orders/bookTreatment');
const { hotel } = require('../Orders/bookHotel');
const path = require('path');


const initPayment = async (values, callBack) => {
    let { userId, totalAmount, numItem } = values
    const tranId = Math.random().toString(36).substr(2, 9) + (new Date()).getTime();
    //get profile
    let profileSql = "SELECT * FROM profile WHERE registrationID = ?";
    var profile = {}
    await query(profileSql, [userId]).then(response => {
        profile = response[0]
    }).catch(err => {
        return res.status(400).send(err);
    })
    const payment = new PaymentSession(
        true,
        process.env.SSLCOMMERZ_STORE_ID,
        process.env.SSLCOMMERZ_STORE_PASSWORD
    );
    payment.setUrls({
        success: "https://nodeapi.sajidur.com/api/payment/success",
        fail: "https://nodeapi.sajidur.com/api/payment/failure",
        cancel: "https://nodeapi.sajidur.com/api/payment/cancel",
        ipn: "https://nodeapi.sajidur.com/api/payment/ipn",
    });
    payment.setOrderInfo({
        total_amount: totalAmount,
        currency: "BDT",
        tran_id: tranId,
        emi_option: 0,
    });
    let name = profile.firstName !== null ? profile.firstName : '' + " " + profile.lastName !== null ? profile.lastName : ''
    payment.setCusInfo({
        name: name !== null ? name : profile.email,
        email: profile.email,
        add1: profile.address,
        add2: profile.address,
        city: 'city',
        state: 'state',
        postcode: 'postcode',
        country: 'country',
        phone: profile.phone,
        fax: profile.phone,
    });
    payment.setShippingInfo({
        method: "Courier",
        num_item: numItem,
        name: name !== null ? name : profile.email,
        add1: profile.address,
        add2: profile.address,
        city: 'city',
        state: 'state',
        postcode: 'postcode',
        country: 'country',
    });
    payment.setProductInfo({
        product_name: "Pets Care Products",
        product_category: "general",
        product_profile: "general",
    });
    let response = await payment.paymentInit();
    callBack(response, tranId)
}


module.exports.product = async (req, res) => {
    const userId = req.user.result.id;
    //get cart
    let cartSql = "SELECT * FROM cart WHERE userID = ?";
    var cartItems = []
    await query(cartSql, [userId]).then(response => {
        cartItems = response
    }).catch(err => {
        return res.status(400).send(err);
    })
    const totalAmount = cartItems.map(item => item.count * item.price)
        .reduce((a, b) => a + b, 0)
    let values = {
        userId,
        totalAmount,
        numItem: cartItems.length
    }
    if (req.body.method === 'cashOn') {
        let values = {
            userId,
            cartItems: cartItems,
            tranId: Math.random().toString(36).substr(2, 9) + (new Date()).getTime(),
            totalAmount,
            cashOn: 1
        }
        productOrder(values)
        return res.status(200).send("order confirmed!")
    } else {
        initPayment(values, (response, tranId) => {
            if (response.status === 'SUCCESS') {
                let values = {
                    userId,
                    cartItems: cartItems,
                    sessionkey: response['sessionkey'],
                    tranId: tranId,
                    totalAmount,
                    cashOn: 0
                }
                productOrder(values)
            }
            return res.status(200).send(response)
        })
    }
}

module.exports.pet = async (req, res) => {
    const userId = req.user.result.id;
    let { totalAmount } = req.body
    let body = req.body
    let values = {
        userId,
        totalAmount,
        numItem: 1
    }
    if (req.body.method === 'cashOn') {
        let values = {
            userId,
            body,
            tranId: Math.random().toString(36).substr(2, 9) + (new Date()).getTime(),
            cashOn: 1
        }
        adaption(values)
        return res.status(200).send("adaption confirmed!")
    } else {
        initPayment(values, (response, tranId) => {
            if (response.status === 'SUCCESS') {
                let values = {
                    userId,
                    body,
                    sessionkey: response['sessionkey'],
                    tranId: tranId,
                    cashOn: 0
                }
                adaption(values)
            }
            return res.status(200).send(response)
        })
    }
}

module.exports.treatment = async (req, res) => {
    const userId = req.user.result.id;
    let { totalAmount } = req.body
    let body = req.body
    let values = {
        userId,
        totalAmount,
        numItem: 1
    }

    if (req.body.method === 'cashOn') {
        let values = {
            userId,
            body,
            tranId: Math.random().toString(36).substr(2, 9) + (new Date()).getTime(),
            cashOn: 1
        }
        treatment(values)
        return res.status(200).send("treatment confirmed!")
    } else {
        initPayment(values, (response, tranId) => {
            if (response.status === 'SUCCESS') {
                let values = {
                    userId,
                    body,
                    sessionkey: response['sessionkey'],
                    tranId: tranId,
                    cashOn: 0
                }
                treatment(values)
            }
            return res.status(200).send(response)
        })
    }
}


module.exports.hotel = async (req, res) => {
    const userId = req.user.result.id;
    let { totalAmount } = req.body
    let body = req.body
    let values = {
        userId,
        totalAmount,
        numItem: 1
    }

    if (req.body.method === 'cashOn') {
        let values = {
            userId,
            body,
            tranId: Math.random().toString(36).substr(2, 9) + (new Date()).getTime(),
            cashOn: 1
        }
        hotel(values)
        return res.status(200).send("hotel booked!")
    } else {
        initPayment(values, (response, tranId) => {
            if (response.status === 'SUCCESS') {
                let values = {
                    userId,
                    body,
                    sessionkey: response['sessionkey'],
                    tranId: tranId,
                    cashOn: 0
                }
                hotel(values)
            }
            return res.status(200).send(response)
        })
    }
}



const checktable = async (transaction_id, callBack) => {
    try {
        let sql = "DROP PROCEDURE IF EXISTS getTableName;"
        query(sql).then(response => {
            let sql = "CREATE PROCEDURE getTableName(IN trxid VARCHAR(100),OUT countOrder INT,OUT countAdoption INT,OUT countHotel INT,OUT countTreatment INT)\n" +
                " BEGIN\n" +
                "SELECT COUNT(orders.id) INTO countOrder FROM orders WHERE orders.transactionID = trxid;  SELECT COUNT(adoption.id) INTO countAdoption FROM adoption WHERE adoption.transactionID = trxid; SELECT COUNT(hotel.id) INTO countHotel FROM hotel WHERE hotel.transactionID = trxid; SELECT COUNT(treatment.id) INTO countTreatment FROM treatment WHERE treatment.transactionID = trxid;\n" +
                "END ";
            query(sql).then(response => {
                let sql = `call getTableName("${transaction_id}",@order,@adoption,@hotel,@treatment)`
                query(sql).then(response => {
                    let sql = `select @order as odr,@adoption as adp,@hotel as htl,@treatment as trt`
                    query(sql).then(response => {
                        if (response[0].odr === 1) {
                            callBack(null, 'orders')
                        } else if (response[0].adp === 1) {
                            callBack(null, 'adoption')
                        } else if (response[0].htl === 1) {
                            callBack(null, 'hotel')
                        } else if (response[0].trt === 1) {
                            callBack(null, 'treatment')
                        }
                    }).catch(err => {
                        callBack(err)
                    })
                })
            })
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}


module.exports.ipn = async (req, res) => {
    try {
        let transaction_id = req.body.tran_id
        checktable(transaction_id, async (err, result) => {
            if (err) return res.status(400).send({ status: 0, message: 'Something failed!' });
            if (result) {
                let status = req.body.payment['status']
                let updateData = {
                    paymentStatus: status,
                    validationId: req.body.val_id
                }
                let sql = "UPDATE " + result + " SET ? WHERE transactionID= ?";
                query(sql, [updateData, transaction_id]).then(response => {
                    if (status === "VALID") {
                        return res.status(200).send({ status: 1, message: 'Payment has been valid' })
                    } else if (status === "FAILED ") {
                        return res.status(200).send({ status: 1, message: 'Payment has been failed' })
                    } else if (status === "CANCELLED ") {
                        return res.status(200).send({ status: 1, message: 'Payment has been canceled' })
                    }

                }).catch(err => {
                    return res.status(400).send(err);
                })
            }
        })

    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports.paymentSuccess = async (req, res) => {
    res.sendFile(path.join(__basedir + "/public/paymentSuccess.html"))
}

module.exports.paymentCancel = async (req, res) => {
    res.sendFile(path.join(__basedir + "/public/paymentCancel.html"))
}

module.exports.paymentFail = async (req, res) => {
    res.sendFile(path.join(__basedir + "/public/paymentFail.html"))
}

