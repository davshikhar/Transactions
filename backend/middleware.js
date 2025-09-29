const secret = require('../config').JWT_SECRET;
const jwt = require('jsonwebtoken');

export const authMiddleware = (req,res,next) =>{
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message:"No token is provided"});
    }

    const verify = JsxEmit.verify('token',secret);
    if(verify){
        const decode = jwt.decode(token);
        req.userId = decode.id;
        next();
    }
    res.status(403).json({message:"Invalid token"});
}