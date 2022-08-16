const query = require('../config/db')
const PaymentSession = require("ssl-commerz-node").PaymentSession;
const { productOrder } = require('../Orders/productOrder');
const { adaption } = require('../Orders/adaption');
const { treatment } = require('../Orders/bookTreatment');
const { hotel } = require('../Orders/bookHotel');


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
        success: "",
        fail: "",
        cancel: "",
        ipn: "",
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
    initPayment(values, (response, tranId) => {
        if (response.status === 'SUCCESS') {
            let values = {
                userId,
                cartItems: cartItems,
                sessionkey: response['sessionkey'],
                tranId: tranId,
                totalAmount
            }
            productOrder(values)
        }
        return res.status(200).send(response)
    })
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
    initPayment(values, (response, tranId) => {
        if (response.status === 'SUCCESS') {
            let values = {
                userId,
                body,
                sessionkey: response['sessionkey'],
                tranId: tranId
            }
            adaption(values)
        }
        return res.status(200).send(response)
    })
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
    initPayment(values, (response, tranId) => {
        if (response.status === 'SUCCESS') {
            let values = {
                userId,
                body,
                sessionkey: response['sessionkey'],
                tranId: tranId
            }
            treatment(values)
        }
        return res.status(200).send(response)
    })
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
    initPayment(values, (response, tranId) => {
        if (response.status === 'SUCCESS') {
            let values = {
                userId,
                body,
                sessionkey: response['sessionkey'],
                tranId: tranId
            }
            hotel(values)
        }
        return res.status(200).send(response)
    })
}



module.exports.ipn = async (req, res) => {
}

module.exports.paymentSuccess = async (req, res) => {
}