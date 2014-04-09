##A Simple Self-signed SSL server W/ Page Reload

##One Time Installation: 

1. `sudo npm install localhost-ssl -g`
2. Open folder of your choice and run `localhost-ssl` 
3. Go through ***one time*** installation of self-signed certs so the tool can server files in ***https***


	```
		
	-----------------------------------------------------------
	Looks like you don't have Self Signed Cert and key!
	
	FOLLOW QUICK STEPS BELOW TO CREATE SELF SIGNED CERTS:
	(Note: these instructions are from the Heroku article: https://devcenter.heroku.com/articles/ssl-certificate-self)
	------------------------------------------------------------
	
	(Copy paste the below commands one by one)
	
	Step 1. openssl genrsa -des3 -passout pass:x -out /usr/local/lib/node_modules/localhost-ssl/server.pass.key 2048 
	
	Step 2. openssl rsa -passin pass:x -in /usr/local/lib/node_modules/localhost-ssl/server.pass.key -out /usr/local/lib/node_modules/localhost-ssl/server.key 
	
	Step 3. rm /usr/local/lib/node_modules/localhost-ssl/server.pass.key 
	
	Step 4. openssl req -new -key /usr/local/lib/node_modules/localhost-ssl/server.key -out /usr/local/lib/node_modules/localhost-ssl/server.csr                  (<----- Hit Enter to accept default values or enter your own) 
	
	Step 5. openssl x509 -req -days 365 -in <path-to-your-folder> server.csr -signkey /usr/local/lib/node_modules/localhost-ssl/server.key -out /usr/local/lib/node_modules/localhost-ssl/server.crt
	
	
	
	**Please Note**: If you get "Permission denied" error, you may need to append "sudo" before each command.

	```
	
4. Run `localhost-ssl` again and if you have followed the above steps, you should see:

	```
	$ localhost-ssl 
	1. Serving files in /Users/rraodv/apps/myApp/www folder at https://localhost:3000/
	2. "Live Reload Browser": Simply run your app in the "1st tab of the 1st window" of Google Chrome browser to see it refresh when a file is changed.
	
	```
5. Open `https://locahost:3000` (Notice HTTPS)
6. *** Chrome warning*** Google shows the below picture asking if you trust your own certificate.

	![image](https://raw.githubusercontent.com/rajaraodv/localhost-ssl/master/chrome-warning.png)

7. If you hit `Proceed anyway`, you see the all the files in your folder. 

	![image](https://raw.githubusercontent.com/rajaraodv/localhost-ssl/master/files-being-served.png)

Note: You will continue to see X mark, but that's simply because self signed cert is not signed by a well know authority like Verisign.



## Live Reload Browser
In addition to serving files in HTTPS, this server also monitors changes to files. If there is any change to any file, it automatically refreshes **1st tab of the 1st window** of Google Chrome browser. 

## Usage

### Basic Usage
(After One Time Installation is complete..)

1. Simply go to any folder of your choice and run `localhost-ssl` to server it in HTTPS in the browser.
2. Open `https://localhost:3000` to see it content (See below to understand how to use it for development).

### Usage: Regular Web Or Mobile App Development

1. Imagine your web app is locally located at `~/path/to/my/app` and contains `index.html`. 
2. Simply run `localhost-ssl` inside `~/path/to/my/app` folder. 
3. Open https://localhost:3000/ in the  **1st tab of the 1st window** of Google Chrome browser. 
4. Now when you make changes to `JavaScript` or `css` or any file and save, you will see browser tab getting refreshed instantly!


### Usage: Visualforce development
This is very handy when developing Visualforce pages that use frameworks like `AngularJS`, `Backbone`, `Ionic` etc. These are JavaScript heavy frameworks and usually 70-80% of your development time is spent in writing, fixing JavaScript and CSS. 



This can be used as a complimentary tool to MavensMate or Eclopse Plugins. 

You will waste a lot of time simply waiting for tools like Force.com IDE, MavensMate or Eclipse Plugins to save JavaScript, CSS changes back to server and then waiting for your browser loading them again back from salesforce server **when Salesforce servers are only required for processing <Apex:> tags!**

1. Make sure you have JavaScript and CSS files are individual Static Resources so we can edit them w/o having to save it to the server (and not as part of main page).
	
	```	
	<!-- This is your main index_page of single-page-app -->
	
	 <link href="{!$Resource.ionic_css}" rel="stylesheet" />
	  
	<script src="{!$Resource.myapp_app_js}"></script>
    <script src="{!$Resource.myapp_controllers_js}"></script>
    <script src="{!$Resource.myapp_services_js}"></script>
   ```


2. Use MavensMate or Eclipse plugin to download files to your machine.
3. Open your index_page and modify it to load from localhost
	
	```	
	<!-- This is your main index_page of single-page-app -->
	
	<!-- Comment out this
	 <link href="{!$Resource.ionic_css}" rel="stylesheet" />
	  
	<script src="{!$Resource.myapp_app_js}"></script>
    <script src="{!$Resource.myapp_controllers_js}"></script>
    <script src="{!$Resource.myapp_services_js}"></script>
    -->
    
    <!-- Point your CSS and JS to https localhost server -->
    <link href="https://localhost:3000/staticresources/ionic_css.resource" rel="stylesheet" />
	  
	<script src="https://localhost:3000/staticresources/ionic_css.resource"></script>
    <script src="https://localhost:3000/staticresources/ionic_css.resource"></script>
    <script src="https://localhost:3000/staticresources/ionic_css.resource"></script>
    
   ```

4. Run `localhost-ssl` at the parent folder of `staticresources` folder are stored so that it can serve css, javascript, pages etc.

5. Open up your Visualforce page  in the **1st tab of the 1st window** of Google Chrome browser. 
   
6. Your Visualforce Page will now load JS and CSS from localhost.
7. And everytime you make any change, the browser will be refreshed for you!


#### NOTE: If the files are not served, it could be because of two issues:
1. You have not asked Chrome to trust your Self-signed Cert.
   - Open https://localhost:3000 to double-check and ask Chrome to trust.
  
2. You are running `localhost-ssl` server in the wrong folder (or the path in your code is different).
   - Copy paste your .js, .css or .resource file in your index page ` and make sure it is actually served (displayed or downloaded) by the server.
 
 
  


#### License (MIT)
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.






