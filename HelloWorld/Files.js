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

// fs.appendFileSync('./File.text' , new Date().getDate().toLocaleString() );
// fs.appendFileSync('./File.text' , "Hello World"); 
// console.log(fs.statSync('./File.text'));
// fs.mkdirSync('my-Docs' )
// const result = fs.readFileSync("./Contacts.text" , "utf-8");
// console.log(result);
// console.log(1);
// fs.readFile("./Contacts.text" , "utf-8" ,  (err , data) => {
//     console.log(data);
// }  );
// console.log(result);
// console.log(2);

const os = require("os");

console.log(os.cpus().length);

 
