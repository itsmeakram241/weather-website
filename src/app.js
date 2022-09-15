const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/weather')

const publicpath=path.join(__dirname,'../public')
const partialpath=path.join(__dirname,'../partials')
const app=express()
 app.set('view engine', 'hbs')
 hbs.registerPartials(partialpath)
app.use(express.static(publicpath))
//  app.get('',(req,res)=>{
//     res.send('<h1>Welcome to express</h1>')
//  })
  app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather app',
        name : 'Mounika'
    })
  })
app.get('/login',(req,res)=>{
    res.send({
        name : 'username',
        password : 'password'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    return  res.send({
        error : 'Please provide the search term'
      })
     console.log(req.query.search)
     res.send({
        category : 'products'
     })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    return res.send({
        error : 'please provide the address'
    })
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error)
        return res.send({error})
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            return res.send(error)

            res.send({
                forecast :forecastData,
                location,
                address  : req.query.address
            })
        })
    })

})

app.get('/help',(req,res)=>{
    res.send([{
        "name" : "Mounika",
        "age"  : "23"
    },{
        name : 'Sarah',
        age  :  22
    }])
})

app.get('/help/*',(req,res)=>{
    res.send('Help article not found')
})

app.get('*',(req,res)=>{
    res.send('404 error')
})

app.listen(3030,()=>{
    console.log('Server is on port 3030')
})