


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

        $scope.$watch(propName, function(newState, oldState ) {
            if (newState === oldState) { // no change
                return; 
            }
            if (!oldState && newState) { // login
                $scope.user = {name: newState.email, id: newState.id, session: newState.sessionKey};
                return;
            }
            if (!newState && oldState) { // logout
                delete $scope.user;
                return;
            }
        });
        
        $scope.createUser = function() {
            auth.createUser($scope.loginForm.userName, $scope.loginForm.password);
        };

        $scope.logout = function () {
            auth.logout();
        };

        $scope.login = function () {
            auth.login($scope.loginForm.userName, $scope.loginForm.password);
        };
    });

    
    
};




};
