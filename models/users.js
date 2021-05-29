const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email:{type:String,unique:true,lowercase:true,require:"email id require"},
    userName:{type:String,unique:true,lowercase:true,require:"userName id require"},
    password:{type:String,require:"password id require"},
    rols:[{
        ref:"roles",
        type:Schema.Types.ObjectId
    }],
    meetings:Array
})

UserSchema.set('toJSON',{
    transform:(returnObject)=>{
        returnObject.id = returnObject._id
        delete returnObject.__v
        delete returnObject._id
    }
})

UserSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('users',UserSchema)



