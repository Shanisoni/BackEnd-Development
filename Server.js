const express = require('express');
const app = express();

app.listen(3000 , () => {
    console.log("Server Started at port no 3000")
}); 

app.get( '/' , (request , responce ) => {
    responce.send("Hello ji Kaise ho Sare ")
});

app.post('/api.cars' , ( request , responce ) => {
    
    const { name , brand } = request.body;
    console.log(name , brand);
    responce.send("Data Recived");
});

 