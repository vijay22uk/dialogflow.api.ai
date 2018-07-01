let io;
let authActions = ["reports_done"];
var api = require('./api');
var jwt   = require('jsonwebtoken'); 
var conn = function (app, server) {
    io = require('socket.io')(server);
};

var fromClient = function () {
    io.on('connection', function (socket) {
        socket.on('fromClient', function (data) {
            api.getRes(data.client.data.text, socket.id).then(function (res) {
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
