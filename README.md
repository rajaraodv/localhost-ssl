#A Simple Node.js based Self-signed SSL server.

Usage: 

0. `git clone git@github.com:rajaraodv/localhost-ssl.git`
1. CD into `localhost-ssl` and do: `npm install`
2. `node app.js <path-to-the-base-folder-that-should-be-served-in-ssl>`
	
	- For example: `node app.js  ~/apps/myapp` if you want to server files from `myapp` folder.
	- You will see the below error at first that asks you to create `server.crt` and `server.key`
	- You can go through the Heroku article or go through the quick steps below to create them.

	```
		
	--------------------------------------------
	ERROR. Self signed cert and key not found!
	
	FOLLOW QUICK STEPS BELOW TO CREATE SELF SIGNED CERTS:
	(Note: these instructions are from this Heroku article: https://devcenter.heroku.com/articles/ssl-certificate-self)
	------------------------------------------------------------
	
	(Copy paste the below commands one by one)
	
	Step 1. openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 
	Step 2. openssl rsa -passin pass:x -in server.pass.key -out server.key 
	Step 3. rm server.pass.key 
	Step 4. openssl req -new -key server.key -out server.csr                  (<----- I typically hit enter and accept default values except for password) 
	Step 5. openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

	```
3. Run step 2 again. 
3. Open browser and go to: `https://localhost:3000/path-to-file-inside-base-folder` (Note: this is HTTPS)
	- For example: If the base folder you entered earlier is: "`~/apps/myapp` and you want to access a file `~/apps/myapp/test.js`, open: `https://localhost:3000/test.js` (<-- HTTPS)

Note: Chrome will complain that this cert is untrusted. But since this is your own localhost and if you trust it, press OK and you are ready to go.





