/**
 * John McLem Adan's Portfolio
 */
const liveServer = require('live-server');
 
const params = {
    port: 8080,
    host: "0.0.0.0",
    root: "./",
    open: false,
    file: "index.html",
};

process.stdout.write('\033c');
console.log(`
'John McLem Adan's Portfolio
`);

liveServer.start(params);