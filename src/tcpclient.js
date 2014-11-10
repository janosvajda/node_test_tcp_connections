var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8765;

var myArgs = process.argv;


function async(arg, callback) {
    var Client = new net.Socket();

    Client.connect(PORT, HOST, function() {
        console.log('Connected to: ' + HOST + ':' + PORT);
        Client.write('CLIENT number of : '+arg);
    });

    Client.on('data', function(data) {  
        console.log('Data: ' + data);
        Client.destroy();
    });

    Client.on('close', function() {
        console.log('Connection closed');
    });

    setTimeout(function() { 
        callback(arg * 2); }, 1000
    );
}

function final() { console.log('DONE: '+myArgs[3]); }


var results = [];
var running = 0;
var limit = 2;
var clients = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]; //10 clients


function start_test() {
    while(running < limit && clients.length > 0) {
    var item = clients.shift();
        async(item, function(result) {
            running--;
            if(clients.length > 0) {
                start_test();
            } else if(running == 0) {
                final();
            }
        });
    running++;
    }
}

start_test();