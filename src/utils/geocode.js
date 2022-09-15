const request=require('request')

const geocode =(address,callback) => {
    const url='http://api.positionstack.com/v1/forward?access_key=b8cbbc620aacc57576128055eabfd7ca&query='+ encodeURIComponent(address)+'&limit=1'
    
    request({url :url,json:true},(error,response)=>{
        if(error){
            callback('Unable to reach the server',undefined)
        }else if(response.body.data.length===0){
            callback('Unable to reach the location. Try another location',undefined)
        }else{
            callback(undefined,{
               latitude: response.body.data[0].latitude,
               longitude : response.body.data[0].longitude,
               location : response.body.data[0].region+','+response.body.data[0].locality
            })
        }
    })
}
module.exports=geocode