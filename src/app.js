const express = require('express');
const routerPath = require('./routes/product.router');
const routerPathCart = require('./routes/cart.router');




const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',routerPath);
app.use('/api/carts',routerPathCart);


app.listen(PORT, ()=>{
    console.log('Se levanto correctamente en el puerto 8080.')
});