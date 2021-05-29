require('dotenv').config()

module.exports = {
    port:process.env.PORT ,
    db:process.env.MONGODB,
    secret:process.env.SECRET,
    weatherApiConfig:{
        url:process.env.APIURL,
        headers:{
                "x-rapidapi-key": process.env.APIKEY,
                "x-rapidapi-host":process.env.APIHOST,
                "useQueryString":true
        }
    }
}