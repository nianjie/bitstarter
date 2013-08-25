


var controllers= new function () {



/**
* @namespace Controllers
*/
var self= this;




/**
* @function
* @property {void} Initialises this namespace
*/
var init;




self.init= function () {

    var myapp = angular.module('myapp', ['TetrisWorld']);

    // for more information see ~/github/coursera.startup/pj/Firebase/test4.html
    myapp.controller('LoginController', function ($scope, auth) {
	var propName = auth.init();

	function usernameToEmail (username) {
	    return '{0}@firebase.com'.replace(/\{0\}/, username);
	};

	function emailToUserName (email) {
	    return email.split('@')[0];
	};

	function clear(prop) {
	    prop = {};
	};

        $scope.$watch(propName, function(newState, oldState ) {
            if (newState === oldState) { // no change
                return; 
            }
            if (!oldState && newState) { // login
                $scope.user = {name: emailToUserName(newState.email), id: newState.id, session: newState.sessionKey};
		delete $scope.login
                return;
            }
            if (!newState && oldState) { // logout
                delete $scope.user;
		delete $scope.login;
                return;
            }
        });
        
        $scope.createUser = function(uname, upwd) {
            auth.createUser(uname, upwd);
        };

        $scope.logout = function () {
            auth.logout();
        };

        $scope.loginFn = function (uname, upwd) {
            auth.login(uname, upwd);
        };
    });

    
    
};





};
