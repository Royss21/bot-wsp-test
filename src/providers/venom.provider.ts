
import * as venomBot from "venom-bot";
var Buffer = require('buffer/').Buffer

export const createVenomClient = async () => {

    const client = await venomBot.create({
      session: 'venom-sessions',
      catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
        console.log(asciiQR); // Optional to log the QR in the terminal
        var matches = base64Qrimg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var response = { type : null, data: null};
  
        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }
        response.type = matches[1];
        response.data = new Buffer.from(matches[2], 'base64');
  
        var imageBuffer = response;
        require('fs').writeFile(
          'venom-bot/venom.qr.png',
          imageBuffer['data'],
          'binary',
          function (err) {
            if (err != null) {
              console.log(err);
            }
          }
        );
      },
      statusFind: (statusSession, session) => {
        console.log('Status Session: ', statusSession);
        console.log('Session name: ', session);
      },
      folderNameToken: "venom-bot",
      logQR: false,
      updatesLog: false
    });
    
    return client
}  