# Nessie-JavaScript-SDK
##Synopsis
Capital One Nessie API SDK written in JavasScript and wrapped in require-jquery. This SDK can be easily embeddded in web apps.
##Installation for Web App
1. Download the lib directory.
2. Save the library in the web project directory.
3. Include the library in the header of the project as shown below:
```
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
The nessie client methods return an object which provides access to data for your desired use.
```javascript
function accountDemo (apikey, account) {
	console.log('Account Demo');
	var custAccount = account.initWithKey(apikey);
	console.log("[Account - Get All] : Sample Account Nickname: (" + custAccount.getAll()[0].nickname + ")");
}
```
You can find examples [here](https://github.com/nessieisreal/nessie-javascript-sdk/blob/master/lib/example.html).