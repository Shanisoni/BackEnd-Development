const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const PORT = 8000;

const { logReqRes } = require("./middleware");
const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");

// Connect to MongoDB
connectMongoDb("mongodb://localhost:27017/Shani-app1");
// Import the User model
const User = require("./models/user");



// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parses JSON bodies
app.use(logReqRes("log.txt"));

// Routes
app.use("/user", userRouter);

// Error-handling Middleware (optional, improves robustness)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

 

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
