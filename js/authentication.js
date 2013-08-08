

var authentication= new function () {

/**
* @namespace Authentication
*/
var self= this;


/**
* @field
* @property {int}
*/
var cookieAge;


/**
* @field
* @property {Firebase}
*/
var datastoreAuthClient;


/**
* @field
* @property {string}
*/
var token;


/**
* @function
* @property {void}
* @param {string} username
* @param {string} password
* @param {function} callback
*/
var login;

/**
* @function
* @property {void}
*/
var logout;


self.init = function () {


};


self.login = function(username, password, callback) {
    username = username || ui.loginUsername();
    password = password || ui.loginPassword();

    self.datastoreAuthClient.login('password', {email: self.usernameToEmail(username), password: password, rememberMe: true});
};


self.createUser= function (username, password, callback) {
    username= username || ui.loginUsername();
    password= password || ui.loginPassword();
	
    self.datastoreAuthClient.createUser(self.usernameToEmail(username), password, function (error, user) {
	if (!error) {
	    self.login(username, password, callback);
	}
	else
	{
	    self.notifyError(error);
	    callback && callback(error);
	}
    });
};


self.createTempUser= function () {
    var username= 'temporary-account-{0}'.replace(/\{0\}/, Date.now());
    var password= 'starter1';

    self.createUser(username, password);
};


self.usernameToEmail= function (username) {
    return '{0}@firebase.com'.replace(/\{0\}/, username);
};




};
