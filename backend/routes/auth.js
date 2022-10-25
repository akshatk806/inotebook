const express=require('express')
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a user using: POST - "/api/auth" (this is the end point)
router.post('/',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({min:3}),
    body('password','Password must contain 3 characters').isLength({min:3})
],(request,response)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    // How to something in request body (Sending json in request body)
    // console.log(request.body); 
    // response.send("Hello")

    User.create({
        email:request.body.email,
        name:request.body.name,
        password:request.body.password
    }).then(user=>response.json(user))
    .catch(err=>{
        console.log(err);
        response.json({
            error:"Please enter a unique email",
            message:err.message
        });
    });
})

module.exports=router