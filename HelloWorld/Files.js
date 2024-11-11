const { Console } = require("console");
const fs = require("fs");

// fs.writeFileSync("./File.text", "Hello World");
// const result =  fs.readFileSync( "./Contacts.text" , "utf-8");
// console.log(result);
// fs.readFile("./Contacts.text" , "utf-8" , (err , data) => {
//    if(err) {
//     console.log(err);
//    }
//    else{
//     console.log(data);

//    }
// });

fs.appendFileSync('./File.text' , new Date().getDate().toLocaleString() );