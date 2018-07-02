let io;
let authActions = ["reports_done"];
var DialogflowClient = require('./dialogflowApi');
var jwt   = require('jsonwebtoken'); 
var conn = function (app, server) {
    io = require('socket.io')(server);
};
var dialogflowApi = new DialogflowClient('en-US');

var fromClient = function () {
    io.on('connection',function(socket){
        socket.on('clientInit',function(data){
            dialogflowApi.init(socket.id,data.name).then(res=>socket.emit('fromServer', { server: res.speech, action: res.action }));
        });
        socket.on('fromClient', function (data) {
            console.log(data);
            dialogflowApi.handleResponse(data.client.data.text, socket.id)
            .then(function (res) {
                if (authActions.indexOf(res.action) !== -1 && !res.actionIncomplete) {
                    // Get data HERE
                    jwt.verify(token, process.env.SECRET, function (err, decoded) {
                        if (err) {
                            socket.emit('fromServer', { server: 'Not Authorized!!'});
                        } else {
                            //HEHE getProject(decoded.name)
                            socket.emit('fromServer', { server: 'Wait::Running Query ' });
                        }
                    });
                    // socket.emit('fromServer', { server: 'Not Authorized', loginRequest: true });
                } else {
                    socket.emit('fromServer', { server: res.speech, action: res.action });
                }
            });
        });    
    });
}
module.exports = { conn, fromClient }
