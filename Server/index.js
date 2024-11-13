const http = require("http");
const fs = require('fs');
const url = require('url');
const express = require('express');

const app = express();

const myServer = http.createServer((app));
myServer.listen(8000, () => {
    console.log("Server Started");
}); 


app.get( "/" , ( request , response) => {
   return response.send("Hello From Home Page");
});

app.get( '/about' , (request , response) => { 
    return response.send("Hello From About Pagte");
})
    



// if (request.url === "/favicon.ico") {
//     return response.end();
// }
// const log = `${Date.now()} :${request.method} ${request.url} New Req Received\n`;
// const myurl = url.parse(request.url, true);
// console.log("Query Params: ", myurl);

// fs.appendFile("log.txt", log, (error ,  data) => {
//     switch (myurl.pathname) {
//         case "/":
//             response.write("Hello From Server");
//             break;
//         case "/about":
//             response.write("This is about page");
//             break;
//         case "/contact":
//             response.write("This is contact page");
//             break;
//         default:
//             response.write("404 Page Not Found");
//     }
//     if(request.url === "/favicon.ico") {
//         return response.end();
//     }
//     if (error) {
//         console.log("Error writing to file:", error);
//     }
//     response.end("Hello From Server Again");
// });

// console.log("New Request Received.");