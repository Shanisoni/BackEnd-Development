const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;
const  {logReqRes} =  require("./middleware");  
const userRouter = require("./routes/users");


const {connectMongoDb} = require('./connection');

connectMongoDb("mongodb://localhost:27017/Shani-app1");
const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // This is important for parsing JSON bodies

app.use( logReqRes("log.txt")) ;
app.use("/user" , userRouter)


// Connect to MongoDB
// mongoose
//   .connect
//   .then(() => console.log(" MongoDB Connected "))
//   .catch((error) => console.log(" MonoDB Error", error));

// Load mock user data
// const users = require("./MOCK_DATA.json");

// Middleware



  // Log request details to a file
 
 


// router.use((req, res, next) => {
//   // Log request details to a file
 
//   next();
// });


// Routes 




// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
