const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer((request, response) => {
    pathName = url.parse(request.url).pathname;
    fs.readFile(__dirname + pathName, function (err, data) {
        if (err) {
            response.writeHead(404, { 'Content-type': 'text/plain' });
            response.write('Page Was Not Found');
            response.end();
        } else {
            response.writeHead(200);
            response.write(data);
            response.end();
        }
    })        
});

app.listen(3000);