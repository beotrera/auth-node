const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const MeetUpsSchema = Schema({
    location:Array,
    date:{type:Date, default:Date.now()},
    guests:Array
})

MeetUpsSchema.set('toJSON',{
    transform:(returnObject)=>{
        returnObject.id = returnObject._id
        delete returnObject.__v
        delete returnObject._id
    }
})

module.exports = mongoose.model('meetups',MeetUpsSchema)