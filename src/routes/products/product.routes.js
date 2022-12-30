const {Router} = require('express');
const fs = require('fs');

const router = Router();

const products = [];


router.get('/', (req,res)=>{
    const limitProduct = req.query.limit;
    if(!limitProduct){
        return res.send({status:"Success", data:products});
    }else{
        let filterProductLimit = products.filter((product,indice) => indice < limitProduct)
        return res.send({Status:'Success',ProductsFilter:filterProductLimit})
     }

})

router.get('/:pid',(req,res)=>{
    const productId = req.params.pid;
    if(productId == 0){
        return res.status(400).send({status:"Error",error:'Product not found'})
    }else{
        const findProductId = products.find(u=>u.id === parseInt(productId))
        
        return res.send({status:"Success",ProductFound:findProductId})
 
        
    }
});
  // metodo post
  
router.post('/',(req,res)=>{
    let user = req.body;

    if(!user.tittle){
    
        return res.status(400).send({status:'error',error:'Incomplete value'})

    }
    let userCreated = {
        id: idCount++,
        ...user
    }
    products.push(userCreated);
    
 console.log(products);
        res.send({status:'success',mesagge:'User created'})

        })
    
        // metodo put



    router.put('/:pid', (req,res)=>{
    const newUser = req.body;
    const idParams = req.params.pid;
    if(!idParams){
    
        return res.status(400).send({status:'error',error:'Incomplete value'})

    }
    
    const userIndex = products.findIndex(u=>u.id === parseInt(idParams))
   

    if(userIndex < 0){
        return res.status(404).send({status:'error',error:'Product not found'})
    }else{
        let upGradeproduct ={
            id: parseInt(idParams),
            ...newUser
        }
        products.splice(userIndex,1,upGradeproduct);
        console.log(products);
        
       
        return res.send({status:'success',mesagge:'Product upgrade'})  
    }
    
})

// metodo delete

router.delete('/:pid', (req,res)=>{
    const idParams = req.params.pid;
    if(!idParams){
    
        return res.status(400).send({status:'error',error:'Incomplete value'})

    }
    
    const userIndex = products.findIndex(u=>u.id === parseInt(idParams))
   

    if(userIndex < 0){
        return res.status(404).send({status:'error',error:'Product not found'})
    }else{
        
        products.splice(userIndex);
        console.log(products);
        
       
        return res.send({status:'success',mesagge:'Removed product'})  
    }
})

export default router;