const query = require('../config/db')

module.exports.addNewProduct = async (req, res) => {
    try {
        let createdBy = req.user.result.id
        let { name, description, price, details, brandID, productCategory, discount } = req.body
        let sql = "CREATE TABLE IF NOT EXISTS product (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), price int, details VARCHAR(255), productCategory int, FOREIGN KEY (productCategory) REFERENCES product_category(id), brandID int, ProductImage VARCHAR(255),FOREIGN KEY (brandID) REFERENCES brand(id),createdBy int ,FOREIGN KEY (createdBy) REFERENCES user(id),isActive BOOLEAN,discount int )";
        await query(sql).then(async response => {
            let sql = "INSERT INTO product (name, description, price, details,productCategory,brandID,ProductImage,createdBy, discount, isActive) VALUES ?";
            let values = [[name, description, price, details, productCategory, brandID, `${req.file.filename}`, createdBy, discount, 1]]
            await query(sql, [values]).then(response => {
                return res.status(200).send({ status: 1, message: 'New product added successfully' })
            }).catch(err => {
                return res.status(400).send({ status: 0, message: err });
            })

        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.getAllProducts = async (req, res) => {
    try {
        let sql = "SELECT * FROM product";
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.getOneProduct = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM product WHERE id = ?";
        await query(sql, [productId]).then(async response => {
           let sql="SELECT * FROM reviews INNER JOIN profile ON reviews.profileID=profile.id WHERE productID=?"
            await query(sql, [productId]).then(review => {
                let rating=0
                for(let data of review){
                    rating+=data.rating
                }
                response[0].avgRating=(rating/review.length).toFixed(1)
                response[0].allReviews= review
                return res.status(200).send({ response, status: 1 })
            })
            
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        let id = req.params.id
        if (req.body.productCategory || req.body.brandID) {
            return res.status(400).send({ status: 0, message: `can not be edited foreign key!` });
        }
        let updateData = req.body
        if (req.file) {
            updateData.ProductImage = req.file.filename
        }
        let sql = "UPDATE product SET ? WHERE id= ?";
        await query(sql, [updateData, id]).then(response => {
            return res.status(200).send({ status: 1, message: 'Product updated successfully' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        let id = req.params.id
        let sql = "DELETE FROM product WHERE id = ?"
        await query(sql, [id]).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully deleted' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.sortByCategory = async (req, res) => {
    try {
        let productId = req.params.id
        let sql = "SELECT * FROM product WHERE productCategory = ?";
        await query(sql, [productId]).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.sortProduct = async (req, res) => {
    try {
        let sql;
        switch (req.body.sort) {
            case "1":
                sql = "SELECT * FROM product ORDER BY id DESC";
                break;
            case "2":
                sql = "";
                break;
            case "3":
                sql = "SELECT * FROM product ORDER BY price ";
                break;
            case "4":
                sql = "SELECT * FROM product ORDER BY price DESC";
                break;
        }
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.searchProduct = async (req, res) => {
    try {
        let serachTerm = req.body.serachTerm;
        let sql = "SELECT * FROM product WHERE name LIKE '%" + serachTerm + "%'"
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })

    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}

module.exports.filterProduct = async (req, res) => {
    try {
        let sql;
        if (req.body.brand) {
            let brandList = req.body.brand
            sql = "SELECT * from product where `brandID` in  (" + brandList + ") AND price BETWEEN " + req.body.start + " AND " + req.body.end + ""
        } else {
            sql = "SELECT * from product where price BETWEEN " + req.body.start + " AND " + req.body.end + ""
        }
        await query(sql).then(response => {
            return res.status(200).send({ response, status: 1 })
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
        console.log(req.body)
        let sql = "UPDATE product SET isActive = " + activeStatus + " WHERE id = " + id + "";
        await query(sql).then(response => {
            return res.status(200).send({ status: 1, message: 'Successfully updated' })
        }).catch(err => {
            return res.status(400).send({ status: 0, message: 'Something failed!' });
        })
    } catch (err) {
        return res.status(400).send({ status: 0, msg: err })
    }
}