#!/usr/bin/env node
var fs = require('fs');
var express = require('express');
var program = require('commander');
var HTMLFILE_DEFAULT = "index.html";
var CACHE_DEFAULT = true;

var app = express.createServer(express.logger());

var cached = {};
var enableCache = CACHE_DEFAULT;
var indexFile = "index.html";

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1);
    }
    return instr;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

if(require.main == module) {
    program
        .option('-n, --nocache', 'Disable file cache (default is enable)')
        .option('-f, --file <html_file>', 'Path to html file (default is index.html)', clone(assertFileExists), HTMLFILE_DEFAULT)
        .parse(process.argv);
    if (program.nocache) enableCache = false;
    if (program.file) indexFile = program.file;
} // what should do when running as an module?

// a function that reads file specified.
var readFile = function(fileName, encoding) {
    var contents = null;
    if (enableCache) { // cache file
	if (!cached[fileName]) {
	    console.log("read file : " + fs.realpathSync(fileName));
	    // either a buffer or a string
	    var out = fs.readFileSync(fileName, encoding);
	    Buffer.isBuffer(out) ? cached[fileName] = out.toString() : cached[fileName] = out;
	}
	contents = cached[fileName];
    } else { // not cache
	console.log("read file : " + fs.realpathSync(fileName));
	// either a buffer(if no encoding specified) or a string(if encoding specified)
	var out = fs.readFileSync(fileName, encoding);
	Buffer.isBuffer(out) ? contents = out.toString() : contents = out;
    }

    return contents;
};


// var myBuffer = new Buffer(256);

app.get('/', function(request, response) {
    var fileContent = readFile(indexFile);

    response.send(fileContent);

    console.log("responsed request from : " + request);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
