


var datastore= new function () {




/**
* @namespace Datastore
*/
var self= this;




/**
* @field
* @property {object}
*/
var data;

/**
* @field
* @property {object (function)}
*/
var eventHandlers;

/**
* @field
* @property {Firebase}
*/
var root;




/**
* @function
* @property {void} Initialises this namespace
*/
var init;

/**
* @function
* @property {Firebase}
* @param {string} id (Optional; current user by default)
*/
var user;




self.eventHandlers= {};
self.root= new Firebase('https://tetrisworld.firebaseio.com/');



self.init= function () {



};




};
