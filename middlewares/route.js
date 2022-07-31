const userRoutes = require('../routes/userRoutes');
const petCategoryRoutes = require('../routes/petCategoryRoutes');
const petRoutes = require('../routes/petRoutes');
const productCategoryRoutes = require('../routes/productCategoryRoutes');
const productRoutes = require('../routes/productRoutes');

module.exports = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/pet/category', petCategoryRoutes);
    app.use('/api/pet', petRoutes);
    app.use('/api/product/category', productCategoryRoutes);
    app.use('/api/product', productRoutes);
}