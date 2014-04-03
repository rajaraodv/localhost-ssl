#A Simple Node.js based Self-signed SSL server.

Usage: 

1. `npm install`
2. `node app.js <path-to-the-base-folder-that-should-be-served-in-ssl>`
	
	- You will see the below error at first that asks you to create `server.crt` and `server.key`
	- You can go through the Heroku article or go through the quick steps below to create them.

	```
	
	-------------------------------------------------------------------------------------------------------------------
	ERROR. Self signed cert and key not found
	Follow the instructions from https://devcenter.heroku.com/articles/ssl-certificate-self to create server.key and server.crt files (see below for the summary of the steps) 
	
	-------------------------------------------------------------------------------------------------------------------
	
	QUICK STEPS TO CREATE SELF SIGNED CERTS: 
	(Copy paste the below commands one by one)
	
	Step 1. openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 
	Step 2. openssl rsa -passin pass:x -in server.pass.key -out server.key 
	Step 3. rm server.pass.key 
	Step 4. openssl req -new -key server.key -out server.csr   (<-- you may want to accept default values if you want)
	Step 5. openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
	
	```
3. Run step 2 again. 
3. Open browser and go to: `https://localhost:3000/path-to-file-inside-base-folder` (Note: this is HTTPS)

Note: Chrome will complain that this cert is untrusted. But since this is your own localhost and if you trust it, press OK and you are ready to go.





