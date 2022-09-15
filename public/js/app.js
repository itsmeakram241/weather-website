  const weatherform=document.querySelector('form')
   const search=document.querySelector('input')
   const messageOne=document.querySelector('#message-1')
   const messagetwo=document.querySelector('#message-2')


   weatherform.addEventListener('submit',(eve)=>{
    eve.preventDefault()
    const location=search.value
    messageOne.textContent='loading...'
    messagetwo.textContent=''

    fetch('http://localhost:3030/weather?address='+location).then((response)=>{
     response.json().then((data)=>{
    if(data.error)
    messageone.textContent=data.error
   else{
   messageOne.textContent=data.location
   messagetwo.textContent=data.forecast
   }
   })

   })

})