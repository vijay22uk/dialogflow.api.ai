var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
const { parsed: config } = dotenv.config();
const apiRoutes = require('./routes');
var jwt = require('jsonwebtoken');
var app = express();
let server = require('http').Server(app)
app.set('superSecret', process.env.SECRET);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
var socket = require('./util/sock');
socket.conn(app, server);
socket.fromClient();
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.use('/api', apiRoutes);

app.get('/logout',
    function (req, res) {
        req.logout();
        res.redirect('/');
    });
var port = process.env.PORT || '8080';
server.listen(port, () => console.log(`Server started on port ${port}`))
