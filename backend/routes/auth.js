const express=require('express')
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');

// Create a user using: POST - "/api/auth/createuser" (this is the end point). No login required
router.post('/createuser',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({min:3}),
    body('password','Password must contain 3 characters').isLength({min:3})
],async (request,response)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions

    // If there errors return Bad request and the errors
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    // How to something in request body (Sending json in request body)
    // console.log(request.body); 
    // response.send("Hello")

    // Check weather the user with this email exists already
    try{
        let user=await User.findOne({email:request.body.email});
    
        if(user){
            return response.status(400).json({
                error:"Sorry! A user with this email already exists"
            })
        }
        const salt=await bcrypt.genSalt(10);
        securedPassword=await bcrypt.hash(request.body.password,salt);

        // Creating an user 
        user=await User.create({
            email:request.body.email,
            name:request.body.name,
            password:securedPassword
        })
        response.json({user})
        
        // .then(user=>response.json(user))
        // .catch(err=>{
        //     console.log(err);
        //     response.json({
        //         error:"Please enter a unique email",
        //         message:err.message
        //     });
        // });
    }
    catch(err){
        console.error(err.message);
        response.status(500).send("Some error occured");
    }
})

module.exports=router