const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect(MONGODB_URI);

const userSchema = new schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
});

const accountSchema = new schema({
    userId:{type:ObjectId, ref:'User', required:true},
    balance:{type:Number, required:true, default:0},
});

const UserModel = mongoose.model('User', userSchema);
const AccountModel = mongoose.model('Account', accountSchema);

module.exports = {
    UserModel:UserModel,
    AccountModel:AccountModel
};