const { Router } = require('express');
const { UserModel } = require('../database/db');
const userRouter = Router();

const secret = require('../config').JWT_SECRET;

const requiredBody = z.object({
        firstname:z.string().max(20),
        lastname:z.string().maz(20),
        email:z.string().email(),
        password:z.string().max(50).regex(/[A-Z]/,{message:"password must contain at least one uppercase letter"})
    });

userRouter.post('/singup', async (req,res)=>{
    //allows the user to sign up as new user
    const {firstname, lastname, email, password} = req.body;
    const parsedDataWithSuccess = requiredBody.safeParse({firstname, lastname, email, password});
    if(!parsedDataWithSuccess.success){
        return res.status(400).json({
            message:parsedDataWithSuccess.error
        });
    }

    const hashedPassword = bcrypt.hash(password, 3);
    //store the user in the database along with the hashed password first check if any error comes or not!
    let errorThrown = false;
    try{
        await UserModel.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:hashedPassword
        });
    }
    catch(e){
        console.log(e);
        errorThrown = true;
    }

    if(!errorThrown){
        return res.status(201).json({
            message:"User created successfully"
        });
    }
    else{
        res.status(411).json({message:"Email already taken/incorrect inputs"});
    }
});

userRouter.post('/signin', async (req,res)=>{
    //allows the user to sign in 
    const {email,password} = req.body;
    const parsedDataWithSuccess = requiredBody.safeParse({email,password});
    if(!parsedDataWithSuccess.success){
        res.json({
            message:parsedDataWithSuccess.error
        });
    }

    const user = await UserModel.find({email:email});

    if(!user){
        return res.status(411).json({
            message:"User not found in the database"
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch){
        res.status(411).json({message:"Password does not match"});
    }

    const token = jwt.sign({id:user._id.toString()},secret);
    return res.status(200).json({
        message:"User signed in successfully",
        token:token
    });
});

app.put('/update',async (req,res)=>{
    //endpoint to update the user details
    const {token, firstname, lastname, password} = req.body;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const verify = jwt.verify(token, secret);
    if(!verify){
        return res.status(401).json({message:"Unauthorized"});
    }

    const userId = verify.id;
    try{
        await UserModel.findByIdAndUpdate(userId,{
            firstname:firstname,
            lastname:lastname,
            password:password});
            return res.status(200).json({message:"User updated successfully"});
    }
    catch(e){
        return res.status(500).json({message:"Error updating user", error:e});
    }
})

module.exports = {
    userRouter:userRouter
};
