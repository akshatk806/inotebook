const express=require('express')
const router=express.Router();
const User=require('../models/User');

// Create a user using: POST - "/api/auth" (this is the end point)
router.post('/',(request,response)=>{

    // How to something in request body (Sending json in request body)
    console.log(request.body); 
    // response.send("Hello")

    const user=User(request.body);
    user.save();
    response.send(request.body)
})

module.exports=router