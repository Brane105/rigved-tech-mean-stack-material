let http = require('http');
let PORT_NO = 3001;
http
.createServer((request, response) => {
    let username = 'Alexandar';
    response.writeHead(200, {'content-type': 'text/html'});
    response.write(`<h2>Hello App</h2>`);
    response.write(`<h3>Username: ${username}</h3>`);
    response.end();
})
.listen(PORT_NO, () => console.log(`Server is running in ${PORT_NO}`));