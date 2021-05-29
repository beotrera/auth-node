const jwt = require('jsonwebtoken')
const RoleMod = require("../models/roles")
const {secret} = require('../config/config')

const  verifyJWT=(request,response,next)=>{
    const authorization = request.get('authorization')
    let token=''

    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token,secret)

    if(!token || !decodedToken.id){
        return  response.status(403).json({error:"token is missing or is invalid"})
    }

    next()
}

const isAdmin =async(request,response,next)=>{

    const token = request.get('authorization').substring(7)
    const decodedToken = jwt.verify(token,secret)

    let idRol = await  RoleMod.find({name:"admin"})
    const correctRol =decodedToken.role.find(x=> x == idRol[0]._id)
    if(correctRol == undefined){
        return  response.status(403).json({error:"token is missing or is invalid"})
    }

    next()
}

const getUserName=(token)=>{
    const decodedToken = jwt.verify(token,secret)
    return{id:decodedToken.id,user:decodedToken.userName}

}

module.exports = {verifyJWT,isAdmin,getUserName}