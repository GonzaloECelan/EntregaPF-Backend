const {Router} = require('express');
const fs = require('fs');

const router = Router();
let idCount = 0;

router.post('/',(req,res)=>{
const cart = {
    id: idCount++,
    products: []
}
   return res.send({cart})
})







