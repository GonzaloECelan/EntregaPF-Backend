const {Router} = require('express');
const fs = require('fs');


const router = Router();
let idCount = 0;
let quantity = 1;


// metodos FS
const readFile = fs.readFileSync('./src/carrito.json', 'utf-8');
const parseCart = JSON.parse(readFile);

const readFileP = fs.readFileSync('./src/products.json', 'utf-8');
const parseProducts = JSON.parse(readFileP);

const write = ()=>{
    const stringFile = JSON.stringify(parseCart,null,2);
    const write = fs.writeFileSync('./src/carrito.json',stringFile);
}

// metodo post: carrito
router.post('/',(req,res)=>{
const newCart = {
    id: idCount = parseCart[parseCart.length - 1].id + 1,
    products: []
}
parseCart.push(newCart);
write();
console.log(parseCart);
res.send({Status:'Success',CartCreated:newCart})
})

router.get('/:cid',(req,res)=>{
const paramsId = req.params.cid;
if(!paramsId){
    return res.status(400).send({status:"Error",error:'Products not found'})
}else{
    const findProducts = parseCart.find(u=>u.id === parseInt(paramsId));
    return res.send({findProducts});
}
})

router.post('/:cid/product/:pid', (req,res)=>{
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const findCart = parseCart.find(u=>u.id === parseInt(cartId));
    const findProduct = parseProducts.find(u=>u.id === parseInt(productId))
   
    const productCart = {
            id: findProduct.id,
            quantity: quantity
        }

    findCart.products.push(productCart);
    write();
    return res.send({findCart})

   
})



module.exports = router;