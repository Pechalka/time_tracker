var express = require('express');
var app = express();
var path = require('path');
var http = require('http');

//app.set('port', process.env.PORT || 8000);

// app.use(express.favicon());
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(app.router);

app.use(express.static(path.join(__dirname)));

http.createServer(app).listen(8000, function () {
    console.log('Express server listening on port ' + app.get('port'));
});