const UserMod = require("../models/users");
const RoleMod = require("../models/roles");
const MeetupsMod = require("../models/meetups");
const  {getUserName} = require('../service/auth')
const bcrypt = require('bcrypt')

const createUser =async(req,res)=>{
    let user = new UserMod()
    let saltRound = 10
    let hash = await bcrypt.hash(req.body.password,saltRound)
    let idRol = await  RoleMod.find({name:"user"})

    console.log(idRol)
    user.email= req.body.email
    user.userName= req.body.userName
    user.password= hash
    user.rols = idRol[0]


    user.save()
    .then(result =>{
        res.status(200).send({id:result._id,menssage:"the user was created"})
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}

const getUsers =(req,res)=>{
    UserMod.find({})
    .then(result =>{
        if(!result) return res.status(400).send({menssage:`user collection is empty`})
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}

const getUserById =(req,res)=>{
    let id = req.params.id

    UserMod.findOne({_id:id})
    .then(result =>{
        if(!result) return res.status(400).send({menssage:`the user with id ${id} does not exist`})
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}

const deleteUser =(req,res)=>{
    let id = req.params.id

    UserMod.findOneAndRemove({_id:id})
    .then(result =>{
        if(!result) return res.status(400).send({menssage:`the user with id ${id} does not exist`})
        res.status(200).send({id:result._id,menssage:"the user was deleted"})
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}

const setAttendance = async(req,res)=>{
    let id = req.params.id
    let token = req.get('authorization').substring(7)
    let data = getUserName(token)
    let array = await MeetupsMod.find({_id:id})
    let exist= array[0].guests.find(x=> x.user === data.user)

    if(exist != undefined)return res.status(404).send({menssage:`user ${data.user} is already registered`})

    MeetupsMod.findOneAndUpdate({_id:id},{guests:[...array[0].guests,data]})
    .then(result =>{
        if(!result) return res.status(400).send({menssage:`the meet with id ${id} does not exist`})
        res.status(200).send({menssage:"the user is registered at the meeting"})
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}



module.exports = {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
    setAttendance
}