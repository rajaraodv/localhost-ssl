#!/usr/bin/env node

var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var path = require('path');

//serve files from 2nd argument or current working directory of the
var pathOfFolderToServe = process.cwd(); 

var serverKey = __dirname + '/server.key';
var serverCert = __dirname + '/server.crt';

if (!fs.existsSync(serverKey) || !fs.existsSync(serverCert)) {
	console.log('\n-----------------------------------------------------------');
	console.log('Looks like you don\'t have Self Signed Cert and key!\n');
	console.log('FOLLOW QUICK STEPS BELOW TO CREATE SELF SIGNED CERTS:');
	console.log('(Note: these instructions are from the Heroku article: https://devcenter.heroku.com/articles/ssl-certificate-self)');

	console.log('------------------------------------------------------------');
	console.log('\n(Copy paste the below commands one by one)\n');
	console.log('Step 1. openssl genrsa -des3 -passout pass:x -out '+__dirname+'/server.pass.key 2048 \n');
	console.log('Step 2. openssl rsa -passin pass:x -in '+__dirname+'/server.pass.key -out '+__dirname+'/server.key \n');
	console.log('Step 3. rm '+__dirname+'/server.pass.key \n');
	console.log('Step 4. openssl req -new -key '+__dirname+'/server.key -out '+__dirname+'/server.csr                  (<----- Hit Enter to accept default values or enter your own) \n');
	console.log('Step 5. openssl x509 -req -days 365 -in '+__dirname+'/server.csr -signkey '+__dirname+'/server.key -out '+__dirname+'/server.crt\n\n');

	console.log('\nNote: If you get "permission denied" error, you may need to append "sudo" before each command.\n\n');

	process.exit();
}





if (!pathOfFolderToServe) {
	console.log('\n-------------------------------------------------------------');
	console.log("\nError: Please enter path to the folder that needs to be served as the 1st parameter. \n\nRun it like this: node app.js <path-to-folder> ");
	console.log('---------------------------------------------------------------\n');

} else {

var watch = require('node-watch');

watch(pathOfFolderToServe, function(filename) {
  console.log(filename, ' changed!!');
  runReloadChrome();
});

process.addListener("uncaughtException", function (err) {
   console.log('\n\nError: Too many files to monitor. Please narrow down to a subfolder with fewer files\nExiting.\n\n');
    process.exit();
});

	// This line is from the Node.js HTTPS documentation.
	var options = {
		key: fs.readFileSync(serverKey),
		cert: fs.readFileSync(serverCert)
	};

	// Create a service (the app object is just a callback).
	var app = express();

	app.use(express.static(pathOfFolderToServe));
	app.use(express.directory(pathOfFolderToServe));


	app.use(express.methodOverride());

	// Create an HTTP service.
	http.createServer(app).listen(4000);
	// Create an HTTPS service identical to the HTTP service.
	https.createServer(options, app).listen(3000);


	console.log('1. Serving files in ' + pathOfFolderToServe + ' folder at https://localhost:3000/');
	console.log('2. "Live Reload Browser": Simply run your app in the "1st tab of the 1st window" of Google Chrome browser to see it refresh when a file is changed.');
}

//function that runs apple script
var spawn = require('child_process').spawn;
var runAppleScript = function (script, callback) {
    var osa = spawn("osascript", ["-e", script]);
    var out = "";
    var err = "";
    osa.stdout.on('data', function (data) {
        out += data;
    });
    osa.stderr.on('data', function (data) {
        err += data;
    });
    osa.on('exit', function (code) {
        // Ignore stdout (which shows the return value of the AppleScript code)
        if (err.length > 0) {
            console.log("STDERR: "+err);
        }
        if (callback) {
            callback();
        }
    });
};
var chromeAppName = "Google Chrome";

//apple script to refresh chrome
var runReloadChrome = runAppleScript.bind(null, '\
    tell application "'+chromeAppName+'"\n\
    tell first tab of first window to reload\n\
    end tell\n\
    ');

