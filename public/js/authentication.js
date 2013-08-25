

var authentication= new function () {

/**
* @namespace Authentication
*/
var self= this;


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
    angular.module('TetrisWorld')
	.factory('auth', ['$rootScope', 'angularFireAuth', 'rootURL', function($rootScope, angularFireAuth, rootURL){
	    
//	    this._authenClient = angularFireAuth(rootURL, {scope:$scope, 
	    // helper functions
	    // complete email address from username if only name is given.
	    function usernameToEmail (username) {
		var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
		return '{0}@firebase.com'.replace(/\{0\}/, username);
	    }
	    
	    return {
		init:  function(options) {
		    // we should catch any angularFireAuth:error in initialization quickly as much as possible.
		    this._scope = $rootScope;
		    this._scope.$on("angularFireAuth:error", function(evt, err) {
			// There was an error during authentication.
			console.log("angularFireAuth:error");
		    });

		    // current we simplly don't take the arguments
		    options = {name: 'auth_name'};
		    this._options = options;

		    angularFireAuth.initialize(rootURL.url, options);

		    this._scope.$on("angularFireAuth:login", function(evt, user) {
			// User logged in.
			console.log("angularFireAuth:login");
			console.log("logined user is:" + user);
		    });
		    this._scope.$on("angularFireAuth:logout", function(evt) {
			// User logged out.
			console.log("angularFireAuth:logout");
		    });
		    this._authenClient = angularFireAuth;
		    return this._options.name;

		},
		login: function(name, pwd) {
		    var self = this;
		    this._authenClient.login('password',  {email: usernameToEmail(name), password: pwd});
		},
		logout: function() {
		    var self = this;
		    this._authenClient.logout();
		},
		createUser: function(name, pwd) {
		    var self = this;
		    this._authenClient.createUser(usernameToEmail(name), pwd);
		}
	    }
	}]);

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
