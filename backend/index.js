const express = require("express");
const app = express();

app.use(express.json());
const cors = require('cors');
app.use(corse());

app.post('/singup', (req,res)=>{
    //allows the user to sign up as new user
});

app.post('/signin', (req,res)=>{
    //allows the user to sign in 
});

app.get('/user',(req,res)=>{
    //returns the user data
})

