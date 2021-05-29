const Roles = require('../models/roles')
const Locations = require('../models/locations')
const Users = require('../models/users')
const bcrypt = require('bcrypt')


const CreateInitialsValues =async()=>{
    try{
        const countRol = await Roles.estimatedDocumentCount();
        const countLoc = await Locations.estimatedDocumentCount();
        const countUser = await Users.estimatedDocumentCount();
        let saltRound = 10
        let adminId ;
        let userId ;
        let adminPass = await bcrypt.hash("admin",saltRound);
        let userPass = await bcrypt.hash("jose123",saltRound);

        if(countRol === 0){
            await Promise.all(
                [
                    new Roles({name:"user"}).save()
                    .then(res=> userId=res._id),
                    new Roles({name:"admin"}).save()
                    .then(res=> adminId=res._id)
                ]
            )
        }

        if(countUser === 0){
            await Promise.all(
                    [
                        new Users({email:"satander@TextDecoderStream.con",
                            userName:"satander",
                            password:adminPass,
                            rols:[adminId,userId]}
                            ).save(),
                        new Users({email:"jose@TextDecoderStream.con",
                            userName:"jose",
                            password:userPass,
                            rols:[userId]}
                            ).save()
                    ]
                )
        }

        if(countLoc === 0){
            await Promise.all(
                [
                    new Locations({
                        addres:"Av. Costanera Rafael Obligado 1221",
                        city:"palermo",
                        state:"capital federal"}).save(),
                    new Locations({
                        addres:"Av. Juan de Garay 125",
                        city:"san telmo",
                        state:"capital federal"}).save(),
                    new Locations({
                        addres:"palermo",
                        city:"Av. Santa Fe 3253",
                        state:"capital federal"}).save()
                ]
            )
        }
    }
    catch(error){
        console.log(error)
    }
}
module.exports = {CreateInitialsValues}