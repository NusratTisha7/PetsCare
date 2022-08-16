const query = require('../config/db')
const PaymentSession = require("ssl-commerz-node").PaymentSession;
const {createOrder} =require('./Orders/productOrder');

module.exports.initPayment = async (req, res) => {

    const userId = req.user.result.id;
    let type = req.body.type

    //get cart
    let cartSql = "SELECT * FROM cart WHERE userID = ?";
    var cartItems = []
    await query(cartSql, [userId]).then(response => {
        cartItems = response
    }).catch(err => {
        return res.status(400).send(err);
    })


    //get profile
    let profileSql = "SELECT * FROM profile WHERE registrationID = ?";
    var profile = {}
    await query(profileSql, [userId]).then(response => {
        profile = response[0]
    }).catch(err => {
        return res.status(400).send(err);
    })

    const totalAmount = cartItems.map(item => item.count * item.price)
        .reduce((a, b) => a + b, 0)

    const tranId = Math.random().toString(36).substr(2, 9) + (new Date()).getTime();

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
        num_item: cartItems.length,
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
    if (response.status === 'SUCCESS') {
        if(type==='order'){
            let values={
                cartItems:cartItems,
                sessionkey:response['sessionkey'],
                tranId:tranId
            }
            createOrder(values)
        }
     
    }
    return res.status(200).send(response)
}

module.exports.ipn = async (req, res) => {
}

module.exports.paymentSuccess = async (req, res) => {
}