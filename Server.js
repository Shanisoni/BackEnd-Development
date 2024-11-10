const express = require('express');
const app = express();

app.listen(8000 , () => {
    console.log("Server Started at port no 8000")
}); 

app.get( '/' , (request , responce ) => {
    responce.send("Hello ji Kaise ho Sare ")
}); 

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/api/cars' , ( request , responce ) => {
    
    const { name , brand } = request.body;
    console.log(name , brand);
    responce.send("Data Recived");
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost::27017//Shani DataBase' ,{
    useNewUrlParser : true ,
    useUnifiedTopology : true

})
.then( () => {console.log("Conenction Successful")} )
.catch( (error) => {console.log("Conection Failed ")})

 