const {Router} = require('express');
const productRoutes = require('./products/product.routes');

const router = Router();

router.use("/products",productRoutes);



export default router;