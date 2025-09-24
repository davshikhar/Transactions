const express = require("express");
const app = express();
const z = require('zod');
const bcrypt = require('bcrypt');

app.use(express.json());
const cors = require('cors');
const { parse } = require("@typescript-eslint/typescript-estree");
app.use(corse());

app.post('/singup', (req,res)=>{
    //allows the user to sign up as new user
    const requiredBody = z.object({
        firstname:z.string().max(20),
        lastname:z.string().maz(20),
        email:z.string().email(),
        password:z.string().max(50).regex(/[A-Z]/,{message:"password must contain at least one uppercase letter"})
    });

    const {firstname, lastname, email, password} = req.body;
    const parsedDataWithSuccess = requiredBody.safeParse({firstname, lastname, email, password});
    if(!parsedDataWithSuccess.success){
        return res.status(400).json({
            message:parsedDataWithSuccess.error
        });
    }

    const hashedPassword = bcrypt.hash(password, 3);
    //store the user in the database along with the hashed password
    return res.status(201).json({
        message:"User created successfully"
    });
    
});

app.post('/signin', (req,res)=>{
    //allows the user to sign in 
});

app.get('/user',(req,res)=>{
    //returns the user data
})

