const mongoose = require("mongoose");

async function connectMongoDb(uri) {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

module.exports = { connectMongoDb };
