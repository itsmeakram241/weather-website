const request=require('request')

const weather =(latitude,longitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=989ffe0e1a288c413e01a9da0e437022&query='+latitude+','+longitude+'&units=m'
    
    request({url :url,json:true},(error,response)=>{
        if(error){
            callback('Unable to reach the server',undefined)
        }else if(response.body.error){
            callback('Unable to fetch the weather of the location. Try another location',undefined)
        }else{
            callback(undefined,{
               summary : response.body.current.weather_descriptions[0]
            })
        }
    })
}
module.exports=weather