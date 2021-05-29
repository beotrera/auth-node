const MeetupsMod = require("../models/meetups");
const LocMod = require('../models/locations')


const createMeet = async(req,res)=>{
    let meet = new MeetupsMod()
    let {id_location,guests,date} = req.body

    meet.location = await  LocMod.find({_id:id_location})
    meet.guests = guests
    if(date != undefined){meet.date = date}

    meet.save()
    .then(result =>{
        res.status(200).send({id:result._id,menssage:"the meeting was created"})
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}

const getMeets =(req,res)=>{
    MeetupsMod.find({})
    .then(result =>{
        if(!result) return res.status(400).send({menssage:`meet collection is empty`})
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}

const getMeetsById =(req,res)=>{
    let id = req.params.id

    MeetupsMod.findOne({_id:id})
    .then(result =>{
        if(!result) return res.status(400).send({menssage:`the meet with id ${id} does not exist`})
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}

const deleteMeet =(req,res)=>{
    let id = req.params.id

    MeetupsMod.findOneAndRemove({_id:id})
    .then(result =>{
        if(!result) return res.status(400).send({menssage:`the meet with id ${id} does not exist`})
        res.status(200).send({menssage:"the meeting was deleted"})
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}

const setGuests = async(req,res)=>{
    let id = req.params.id
    let  data = req.body
    let array = await MeetupsMod.find({_id:id})


    MeetupsMod.findOneAndUpdate({_id:id},{guests:[...array[0].guests,...data]})
    .then(result =>{
        if(!result) return res.status(400).send({menssage:`the meet with id ${id} does not exist`})
        res.status(200).send({menssage:"users were added to the meeting"})
    })
    .catch(err=>{
        res.status(500).send({menssage:`${err}`})
    })
}



module.exports = {
    createMeet,
    getMeets,
    getMeetsById,
    deleteMeet,
    setGuests
}