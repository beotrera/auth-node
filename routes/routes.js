const express = require('express')
const api = express.Router()
const MeetsCrtl = require('../controllers/meetups')
const UserCrtl = require('../controllers/users')
const LoginCrtl = require('../controllers/auth')
const auth = require('../service/auth')
const WCrtl = require('../controllers/weather')




api.post('/createMeet',[auth.verifyJWT,auth.isAdmin],MeetsCrtl.createMeet)
api.put('/setGuests/:id',[auth.verifyJWT,auth.isAdmin],MeetsCrtl.setGuests)
api.put('/setAttendance/:id',auth.verifyJWT,UserCrtl.setAttendance)
api.get('/getCantBirras/:id',auth.verifyJWT,WCrtl.getCantBirras)
api.get('/getMeetingTemp/:id',auth.verifyJWT,WCrtl.getMeetingTemp)

//Others
//getJWT
api.post('/getJWT',LoginCrtl.LoginUser)
//meet
api.get('/getMeets',auth.verifyJWT,MeetsCrtl.getMeets)
api.get('/getMeetsById/:id',auth.verifyJWT,MeetsCrtl.getMeetsById)
api.delete('/deleteMeet/:id',[auth.verifyJWT,auth.isAdmin],MeetsCrtl.deleteMeet)
//user
api.post('/createUser',UserCrtl.createUser)
api.get('/getUsers',[auth.verifyJWT,auth.isAdmin],UserCrtl.getUsers)
api.get('/getUserById/:id',[auth.verifyJWT,auth.isAdmin],UserCrtl.getUserById)
api.delete('/deleteUser/:id',[auth.verifyJWT,auth.isAdmin],UserCrtl.deleteUser)

module.exports = api;