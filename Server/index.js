const http = require( "http");

const myServer = http.createServer( ( request , responce ) => {

    console.log("New Request Recived .");
    responce.end("Hello From Server")

});

myServer.listen(8000 , () => {
    console.log("Server Started")
}); 