const express=require('express')
const router=express.Router();

router.get('/',(request,response)=>{
    obj={
        a:'akshat',
        num:12
    }
    response.json(obj);
})

module.exports=router