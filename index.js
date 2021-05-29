const mongoose = require('mongoose')
const app = require('./app')
const  config = require('./config/config')
const initialSetups = require('./service/initialsSetups')

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}


mongoose.connect(config.db, mongoConfig)
.then(result =>{
    console.log('Mongo ready')
    initialSetups.CreateInitialsValues()
    app.listen(config.port,()=>{ console.log(`api listen in port ${config.port}`)})
})
.catch(err=>{
    console.log(`Error to connect : ${err}`)
})
