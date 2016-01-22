var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(express.static('content'));
app.use(bodyParser.json());

app.post('/', function(request, response){
    console.log(request.body.user.name);
    console.log(request.body.user.email);
});

app.post('/eval', function(req, res){
	var obj = {};
	console.log('Got: ' + JSON.stringify(req.body));
	
	try {
		var r = global.eval(req.body.code);
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ result: r }));
	}catch(e) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ error: e.message }));
	}
});

app.listen(1337, function () {
	console.log('Listening on port 1337!');
});

global.evalFile = function(path) {
	return global.eval(fs.readFileSync(path, "utf8"));
}
