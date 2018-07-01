var express = require('express');
var apiRoutes = express.Router();
var jwt   = require('jsonwebtoken'); 
var User = require('../DB').User;
apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                var payload = {
                    name: user.name
                }
                var token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Enjoy!!!',
                    name: user.name,
                    token: token
                });
            }
        }
    });
});


apiRoutes.use(function (req, res, next) {
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

apiRoutes.get('/', function(req, res) {
	res.json({ message: 'Ping <<<<<...>>>>> Pong!' });
});

apiRoutes.get('/sample', function(req, res) {
	res.json(req.decoded);
});

module.exports = apiRoutes;