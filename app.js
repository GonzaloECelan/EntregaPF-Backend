const express = require('express');
const routerPath = require('./src/routes/app.router');


const app = express();
const PORT = 8080;
app.use("/api",routerPath);
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.listen(PORT, ()=>{
    console.log('Se levanto correctamente.')
});