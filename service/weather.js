const axios = require('axios')
const config = require('../config/config')


const data = {
    headers:config.weatherApiConfig.headers,
    params:{
        aggregateHours:24,
        location:"",
        unitGroup:"uk",
        contentType:"json"
    }
}

const getWeather = async(addres,city,state,date) =>{
    data.params.location = `${addres},${city},${state},AR`


    return new Promise(async(resolve, reject) => {
        await axios.get(config.weatherApiConfig.url,data)
        .then(response=>{
            let weatherValues = response.data.locations[data.params.location].values
            let result = weatherValues.find(x=>{
                return x.datetimeStr.split("T")[0] === date.toISOString().split("T")[0]
            })
            if(result === undefined){resolve({menssage:"Date of meeting is out of range"})}
            resolve({status:200,data:result}
            )}
        )
        .catch(error=> reject(error))
    })
}

const getBirras =(cant,temp)=>{
    let total
    if(parseInt(temp) > 24){
        total = parseInt(cant) * 3
        return total
    }

    total = parseInt(cant) * 1.5
    return total
}

module.exports = {getWeather,getBirras}