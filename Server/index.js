const http = require("http");
const fs = require('fs');

const myServer = http.createServer((request, response) => {
    const log = `${Date.now()} : ${request.url} New Req Received\n`;

    fs.appendFile("log.txt", log, (error) => {
        if (error) {
            console.log("Error writing to file:", error);
        }
        response.end("Hello From Server Again");
    });

    console.log("New Request Received.");
});

myServer.listen(8000, () => {
    console.log("Server Started");
});
