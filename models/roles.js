const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RolesSchema = new Schema(
    {
        name:String
    },
    {
        versionKey:false
    })

module.exports = mongoose.model('roles',RolesSchema)



