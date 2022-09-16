const query = require('../config/db')

module.exports.addCartItem = async (req, res) => {
    try {
        let { userID, productID, count } = req.body
        let price;
        let getPriceSql = "SELECT price,discount FROM product WHERE id = ?";
        let [result] = await query(getPriceSql, [productID])
        if(result.discount!==0){
            let discount = ((result.price)*(result.discount))/100
            price = result.price-discount
        }else{
            price=result.price
        }
       
        if (price) {
            let sql = "CREATE TABLE IF NOT EXISTS cart (id INT AUTO_INCREMENT PRIMARY KEY, price int, count int, userID int, FOREIGN KEY (userID) REFERENCES user(id),productID int, FOREIGN KEY (productID) REFERENCES product(id),isActive BOOLEAN)";
            await query(sql).then(async response => {
                let sql = "INSERT INTO cart (userID,productID,price,count,isActive) VALUES ?";
                let values = [[userID, productID, price, count, 1]]
                await query(sql, [values]).then(response => {
                    return res.status(200).send({ status: 1, message: 'Added to cart successfully!' })
                }).catch(err => {
                    return res.status(400).send({ status: 0, message: 'Something failed!' });
                })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: 'Something failed!' });
            })
        } else {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        }
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.getCartItem = async (req, res) => {
    try {
        let userId = req.params.id
        let sql = "SELECT * FROM cart WHERE userID = ?";
        await query(sql, [userId]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.updateCartItem = async (req, res) => {
    try {
        let { count, cartID } = req.body
        let sql = "UPDATE cart SET count = " + count + " WHERE id = ?";
        await query(sql, [cartID]).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.deleteCartItem = async (req, res) => {
    try {
        let cartId = req.params.id
        let sql = "DELETE FROM cart WHERE id = ?"
        await query(sql, [cartId]).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully deleted' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.editActiveStatus = async (req, res) => {
    try {
        let { activeStatus, id } = req.body
        let sql = "UPDATE cart SET isActive = " + activeStatus + " WHERE id = " + id + "";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

