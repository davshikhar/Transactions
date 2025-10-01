const express = require('express');
const { authMiddleware } = require('../middleware');
const { AccountModel } = require('../database/db');
const Router = express.Router();

const accountRouter = Router();

//Account related all the routes here
accountRouter.get('/balance',authMiddleware ,async(req,res)=>{
    const userId = req.userId;
    const account = await AccountModel.findOne({userId});

    if(account){
        return res.status(200).json({
            balance:account.balance
        })
    }
    res.status(411).json({message:"Account not found"});
})

accountRouter.post('/transfer', authMiddleware, async(req,res)=>{
    const {amount, to} = req.body;
    const session = await mongoose.startSession();

    session.startTransaction();

    const account = await UserModel.findOne({userId:req.userId}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        res.status(411).json({message:"Account not found in the db"});
        await session.endSession();
        return;
    }
    else if(account.balance < amount){
        await session.abortTransaction();
        res.status(411).json({message:"Insufficient balance in account"});
        await session.endSession();return;
    }

    const toAccount = await AccountModel.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        res.status(411).json({message:"Invalid account"});
        await session.endSession();return;
    }

    // Doing the desired operations
    await AccountModel.updateOne({userId:req.userId}, {$inc:{balance:-amount}}).session(session);
    await AccountModel.updateOne({userId:to}, {$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    await session.endSession();
    res.json({message:"Transfer successfull"});
})

module.exports = {
    accountRouter:accountRouter
};