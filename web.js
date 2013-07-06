var express = require('express');

var app = express.createServer(express.logger());

var cached = {};

// a function that reads file specified.
var readFile = function(fileName, encoding) {
    if (!cached[fileName]) {
	var fs = require('fs');
	var out = fs.readFileSync(fileName, encoding);
	console.log("read file : " + fs.realpathSync(fileName));
	// either a buffer or a string
	Buffer.isBuffer(out) ? cached[fileName] = out.toString() : cached[fileName] = out;
    }
    
    return cached[fileName];
};


// var myBuffer = new Buffer(256);
var indexFile = "index.html";

app.get('/', function(request, response) {
    var fileContent = readFile(indexFile);

    response.send(fileContent);
    
    console.log("responsed request from : " + request);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
