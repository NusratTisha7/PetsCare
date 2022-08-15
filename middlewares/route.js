const userRoutes = require('../routes/userRoutes');
const petCategoryRoutes = require('../routes/petCategoryRoutes');
const petRoutes = require('../routes/petRoutes');
const productCategoryRoutes = require('../routes/productCategoryRoutes');
const productRoutes = require('../routes/productRoutes');
const cartRoutes = require('../routes/cartRoutes');
const brandRoutes = require('../routes/brandRoutes');
const reviewRoutes = require('../routes/reviewRoutes');
const lattestOfferRoutes = require('../routes/lattestOfferRoutes');
const profileRoutes = require('../routes/profileRoutes');
const paymentRoutes = require('../routes/paymentRoutes');

module.exports = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/pet/category', petCategoryRoutes);
    app.use('/api/pet', petRoutes);
    app.use('/api/product/category', productCategoryRoutes);
    app.use('/api/product', productRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/brand', brandRoutes);
    app.use('/api/offer', lattestOfferRoutes);
    app.use('/api/profile', profileRoutes);
    app.use('/api/review', reviewRoutes);
    app.use('/api/payment', paymentRoutes);
}