#!/usr/bin/env node

var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');


if (!fs.existsSync('server.key') || !fs.existsSync('server.crt')) {
	console.log('\n--------------------------------------------');
	console.log('ERROR. Self signed cert and key not found!\n');
	console.log('FOLLOW QUICK STEPS BELOW TO CREATE SELF SIGNED CERTS:');
	console.log('(Note: these instructions are from this Heroku article: https://devcenter.heroku.com/articles/ssl-certificate-self)');

	console.log('------------------------------------------------------------');
	console.log('\n(Copy paste the below commands one by one)\n');
	console.log('Step 1. openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 \nStep 2. openssl rsa -passin pass:x -in server.pass.key -out server.key \nStep 3. rm server.pass.key \nStep 4. openssl req -new -key server.key -out server.csr                  (<----- Hit Enter to accept default values or enter your own) \nStep 5. openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt\n\n');

	process.exit();
}

var pathOfFolderToServe = process.argv[2];

if (!pathOfFolderToServe) {
	console.log('\n-------------------------------------------------------------');
	console.log("\nError: Please enter path to the folder that needs to be served as the 1st parameter. \n\nRun it like this: node app.js <path-to-folder> ");
	console.log('---------------------------------------------------------------\n');

} else {



	// This line is from the Node.js HTTPS documentation.
	var options = {
		key: fs.readFileSync('server.key'),
		cert: fs.readFileSync('server.crt')
	};

	// Create a service (the app object is just a callback).
	var app = express();

	app.use(express.static(pathOfFolderToServe));
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.methodOverride());

	// Create an HTTP service.
	http.createServer(app).listen(4000);
	// Create an HTTPS service identical to the HTTP service.
	https.createServer(options, app).listen(3000);

	console.log('You can now access files in ' + pathOfFolderToServe + ' path at https://localhost:3000/');
	console.log('\nExample: If the base folder you entered earlier is: "~/apps/myapp" and you want to access a file "~/apps/myapp/test.js", open: https://localhost:3000/test.js');
	console.log('\nChrome will complain that this is insecure, but since this is your own machine you should be fine');
}