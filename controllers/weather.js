const weather = require('../service/weather')
const MeetupsMod = require("../models/meetups");


const getMeetingTemp =async(req,res)=>{
    let meeting_id = req.params.id;
    let meeting = await MeetupsMod.find({_id:meeting_id})
    if(meeting.length == 0) return res.status(400).send({menssage:`the meet with id ${meeting_id} does not exist`})

    let {addres,city,state} = meeting[0].location[0]
    let {date} = meeting[0]

    weather.getWeather(addres,city,state,date)
    .then((response) => response)
    .then(weatherData =>{
        if(weatherData.status != 200){res.send(weatherData)}
        let {temp,conditions} = weatherData.data;
        res.send({conditions:`the weather is ${conditions}`,temperature:`${temp}°C`})
    })
    .catch((err) => {res.send(err);});
}

const getCantBirras =async(req,res)=>{
    let meeting_id = req.params.id;
    let meeting = await MeetupsMod.find({_id:meeting_id})
    if(meeting.length == 0) return res.status(400).send({menssage:`the meet with id ${meeting_id} does not exist`})

    let {addres,city,state} = meeting[0].location[0]
    let {date} = meeting[0]
    let cantGuest = meeting[0].guests.length


    weather.getWeather(addres,city,state,date)
    .then((response) => response)
    .then(weatherData =>{
        if(weatherData.status != 200){res.send(weatherData)}
        let {temp} = weatherData.data;
        let total = weather.getBirras(cantGuest,temp)
        res.send({boxForMeeting:Math.round(total/6),birrasForPeople:total,temp:parseInt(temp)})
    })
    .catch((err) => {res.send(err);});
}



module.exports = {getMeetingTemp,getCantBirras}