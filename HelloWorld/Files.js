const fs = require("fs");

// fs.writeFileSync("./File.text", "Hello World");
const result =  fs.readFileSync( "./Contacts.text" , "utf-8");
console.log(result);