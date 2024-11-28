const fs = require("fs");
function logReqRes(filename) {
    return ( req , res , next) => {
        fs.appendFile(
            filename,
            `\n${Date.now()} ${req.ip}: ${req.method} : ${req.path}\n`,
            (err , data ) => {
              next();
              // if (err) {
                
              //   console.error("Error saving logs:", err);
              // } else {
              //   console.log("Logs are saved");
              // }
            }
          );
    }
}

module.exports = {
    logReqRes
}