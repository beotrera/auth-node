const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')

const LoginUser =async(req,res)=>{
    const {body} = req;
    const {userName,password} = body;

    const user = await User.findOne({userName})
    const correctPassword=  user === null
    ? false
    :await bcrypt.compare(password, user.password)

    if(!(correctPassword && user)){
        return res.status(403).send({error:"invalid user or password"})
    }

    const userForToken={
        id:user._id,
        userName:user.userName,
        role:user.rols
    }

    const  Token =  jwt.sign(userForToken,secret,{expiresIn: 60 * 60 * 24 * 7})

    return res.status(200).send({menssage:"Login succes",token:Token})
}


module.exports ={
    LoginUser
}