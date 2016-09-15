# Nessie-JavaScript-SDK
##Synopsis
Capital One Nessie API SDK written in JavaScript and wrapped in require-jquery. This SDK can be easily embedded in web apps.
##Installation for Web App
1. Download the lib directory.
2. Save the library in the web project directory.
3. Include the library in the header of the project (double check your directory path!) as shown below:
```javascript
<script data-main="lib/capital_one" src="lib/require-jquery.js"></script>
```
##Usage
1. Require the Nessie library you intend to use, within the function to execute after the DOM is ready.
2. Set the api key. With the api key set, you're ready to use to client to get any data that you need.
```javascript
$(function(){
	require(['account'], function (account) {
		var apikey = 'YOUR-API-KEY';
		accountDemo(apikey, account);
	});
});
```
Each Nessie client method returns an object which provides access to data for your desired use.
```javascript
function accountDemo (apikey, account) {
	console.log('Account Demo');
	var custAccount = account.initWithKey(apikey);
	console.log("[Account - Get All] : Sample Account Nickname: (" + custAccount.getAllAccounts()[0].nickname + ")");
}
```
You can find examples [here](https://github.com/nessieisreal/nessie-javascript-sdk/blob/master/lib/example.html).
