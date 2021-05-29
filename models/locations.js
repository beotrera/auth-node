const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');

const LocationSchema = Schema({
    addres:{type:String,unique:true,lowercase:true},
    city:{type:String,lowercase:true,require:"city is require"},
    state:{type:String,lowercase:true,require:"state is requiere"}
})

LocationSchema.set('toJSON',{
    transform:(returnObject)=>{
        returnObject.id = returnObject._id
        delete returnObject.__v
        delete returnObject._id
    }
})

LocationSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('locations',LocationSchema)