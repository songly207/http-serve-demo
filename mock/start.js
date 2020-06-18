/* eslint-disable */
const childProcess = require('child_process');
const worker = childProcess.fork('mock/server.js');

worker.on('message',function(mes){
    if (mes === 'exit') {
        let test = childProcess.fork('mock/start.js');
    }
});