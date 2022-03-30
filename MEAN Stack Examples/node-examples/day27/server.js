// load the express module & create reference of the top level function
let express = require("express");
let app = express();
// pass the express to the Server of http to connect express with http
let http = require("http").Server(app);
// load the socket.io module and connect http module
let socketio = require("socket.io");
let io = socketio(http);
//load the index.html file when you send request from the browser
app.get("/", (request, response) => {
    // __dirname is the javascript property to find the current directory
    response.sendFile(__dirname+'/index.html'); 
})
//establish connection between client & the server
io.on('connection', (socket) => {
    socket.on("msg", (data) => {
        console.log(`Client sent ${data}`)
    });
    //server sends some data to the connected client
    socket.emit('obj', 'Hello I am server');
});
// start the http server so that client can access the http server
http.listen(3000, () => console.log('server is running in 3000'))