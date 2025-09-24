const mongoose = require('mongoose');
const schema = mongoose.Schema;

mongoose.connect(MONGODB_URI);

const userSchema = new schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;