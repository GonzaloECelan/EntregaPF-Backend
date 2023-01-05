
const {Router} = require('express');
const fs = require('fs');


const router = Router();


let idCount = 0;

const readFile = fs.readFileSync('./src/products.json','utf-8');
const productsParse = JSON.parse(readFile);

const write = ()=>{
const productString = JSON.stringify(productsParse,null,2);
const writeFile = fs.writeFileSync('./src/products.json',productString);

}



router.get('/', (req,res)=>{
    const limitProduct = req.query.limit;
    if(!limitProduct){
        return res.send({status:"Success", data:productsParse});
    
    }else{
        let filterProductLimit = productsParse.filter((product,indice) => indice < limitProduct)
        return res.send({Status:'Success',ProductsFilter:filterProductLimit})
     }

})
  // metodo get por id

router.get('/:pid',(req,res)=>{
    const productId = req.params.pid;
    if(productId == 0){
        return res.status(400).send({status:"Error",error:'Product not found'})
    }else{
        const findProductId = productsParse.find(u=>u.id === parseInt(productId))
        
        return res.send({status:"Success",ProductFound:findProductId})
 
        
    }
});
  // metodo post
  
router.post('/',(req,res)=>{
    let product = req.body;

    if(!product.tittle){
    
        return res.status(400).send({status:'error',error:'Incomplete value'})

    }else{
        const productCreated = {
            id: idCount = productsParse[productsParse.length - 1].id + 1,
            ...product
        }
    
        productsParse.push(productCreated);
        write();
        console.log(productsParse);
        return res.send({status:'success',product:productCreated})
        


    }
   
       

        })
    
        // metodo put



    router.put('/:pid', (req,res)=>{
    const newProduct = req.body;
    const idParams = req.params.pid;
    if(!idParams){
    
        return res.status(400).send({status:'error',error:'Incomplete value'})

    }
    
    const productIndex = productsParse.findIndex(u=>u.id === parseInt(idParams))
   

    if(productIndex < 0){
        return res.status(404).send({status:'error',error:'Product not found'})
    }else{
        let upGradeproduct ={
            id: parseInt(idParams),
            ...newProduct
        }
        productsParse.splice(productIndex,1,upGradeproduct);
        console.log(productsParse);
        
       
        return res.send({status:'success',mesagge:'Product upgrade'})  
    }
    
})

// metodo delete

router.delete('/:pid', (req,res)=>{
    const idParams = req.params.pid;
    if(!idParams){
    
        return res.status(400).send({status:'error',error:'Incomplete value'})

    }
    
    const productIndex = productsParse.findIndex(u=>u.id === parseInt(idParams))
   

    if(productIndex < 0){
        return res.status(404).send({status:'error',error:'Product not found'})
    }else{
        
        productsParse.splice(productIndex);
        console.log(productsParse);
        
       
        return res.send({status:'success',mesagge:'Removed product'})  
    }
})


module.exports = router;