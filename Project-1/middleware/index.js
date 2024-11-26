const fs = require("fs");
function logReqRes(filename) {
    return ( req , res , next) => {
        fs.appendFile(
            "Logs.txt",
            `\n${Date.now()} ${req.ip}: ${req.method} : ${req.path}\n`,
            (err) => {
              if (err) {
                next();
                console.error("Error saving logs:", err);
              } else {
                console.log("Logs are saved");
              }
            }
          );
    }
}