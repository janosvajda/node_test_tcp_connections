var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8765;

net.createServer(function(sock) {
    console.log('Connected: ' + sock.remoteAddress +':'+ sock.remotePort);
    
    sock.on('data', function(data) {      
        console.log('Data from client ' + sock.remoteAddress + ': ' + data);
        sock.write('Sent "' + data + '"');        
        sock.end();
    });
    
    sock.on('close', function(data) {
        console.log('CLOSED: ' + data);
    });
    
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);