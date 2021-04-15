const express = require('express');
const app = express();
var SerialPort = require("serialport");

var port = 5000;

var arduinoCOMPort = "COM5";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {
 baudRate: 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

app.get('/', function (req, res) {

    return res.send('Working');

})

app.get('/:action', function (req, res) {

   var action = req.params.action || req.param('action');

    if(action == 'led'){
        arduinoSerialPort.write("1");
        return res.send(`<a href="/off" style="color: white; background:#e74c3c; padding: 3px 10px; font-size: 20px; font-family: sans-serif; text-decoration: none;">off</a>`);
    }
    if(action == 'off') {
        arduinoSerialPort.write("0");
        return res.send(`<a href="/led" style="color: white; background:#2ecc71; padding: 3px 10px; font-size: 20px; font-family: sans-serif; text-decoration: none;">led</a>`);
    }

    return res.send('Action: ' + action);

});

app.listen(port, function () {
  console.log('Example app listening on port http://127.0.0.1:' + port);
});

//for git
