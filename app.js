var express = require('express');
var session = require('express-session');
var server = express();
var bodyParser = require('body-parser');
var nodeuuid = require('node-uuid');

var iot4i_user = require( './bl/user.js');
var iot4i_shield = require( './bl/shield.js');
var iot4i_code = require( './bl/shieldCode.js');
var iot4i_association = require( './bl/shieldAssociation.js');
var iot4i_simulate = require( './bl/hazard.js');

var config = null;

var appEnv = require('cfenv').getAppEnv({});

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

var iot4i_service = appEnv.getService(/.*Insurance.*/);
if ( iot4i_service == null) {
	iot4i_service = appEnv.getService("iot4i");
}

if ( iot4i_service != null) {
	config = {
		api: iot4i_service.credentials.uri,
		credentials: {
			username: iot4i_service.credentials.userid,
			password: iot4i_service.credentials.password
		}
	} 
} else {
	
	try{
		config = require('./config.js');
	} catch( error) {
		config = { error: 'Invalid configuration. Cannot find IoT4I Service.'};
	}
}

//remove trailing / if any
if ( config && config.api && endsWith(config.api, "/" )) {
	config.api = config.api.slice(0, -1);
}

server.use(session({
	secret: 'iot4i-api-examples',
	saveUninitialized: false,
	resave: true,
	rolling: true,
	cookie: {
		httpOnly: true,
		secure: true,
		maxAge: 3600000	// 1 hour
	}
}));

var createUser = function( req, resp) {
	console.log( "Create user.");
	
	iot4i_user.createUser( config, Date.now(), function(data, error) {
		//console.log(">>> DATA: " + data);
		//console.log(">>> ERROR: " + error);
		
		if ( data) {
			console.dir( data);
			resp.send( data);
		} else {
			resp.send( error);
		}
		
	});
}

var createShield = function( req, resp) {
	console.log( "Create shield.");
	
	iot4i_shield.createShield( config, Date.now(), function(data, error) {
		//console.log(">>> DATA: " + data);
		//console.log(">>> ERROR: " + error);
		
		if ( data) {
			console.dir( data);
			resp.send( data);
		} else {
			resp.send( error);
		}
		
	});
}

var createShieldCode = function( req, resp) {
	
	console.log( "Create shield code: " + req.body.shieldid);
	
	iot4i_code.createShieldCode( config, req.body.shieldid, function(data, error) {
		//console.log(">>> DATA: " + data);
		//console.log(">>> ERROR: " + error);
		
		if ( data) {
			console.dir( data);
			resp.send( data);
		} else {
			resp.send( error);
		}
		
	});
}

var createShieldAssociation = function( req, resp) {
	
	console.log( "Create shield association: " + req.body.username + "-" + req.body.shieldid);
		
	iot4i_association.createUserShieldAssociation( config, req.body.username, req.body.shieldid, function(data, error) {
		//console.log(">>> DATA: " + data);
		//console.log(">>> ERROR: " + error);
		
		if ( data) {
			console.dir( data);
			resp.send( data);
		} else {
			resp.send( error);
		}
		
	});
}

var simulateHazard = function( req, resp) {
	console.log( "Simulate hazard: " + req.body.username);
	
	iot4i_simulate.simulateHazard( config, req.body.username, function(data, error) {
		//console.log(">>> DATA: " + data);
		//console.log(">>> ERROR: " + error);
		
		if ( data) {
			console.dir( data);
			resp.send( data);
		} else {
			resp.send( error);
		}
		
	});
}

var getInfo = function( req, resp) {
	resp.send( config);
}

server.disable('x-powered-by');
server.enable('trust proxy');

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(express.static(__dirname + "/public"));

server.get("/info", getInfo);
server.post("/data/user", createUser);
server.post("/data/shield", createShield);
server.post("/data/code", createShieldCode);
server.post("/data/association", createShieldAssociation);
server.post("/data/hazard", simulateHazard);

server.get("/", function( req, resp) {
	resp.redirect( "/dashboard/index.html");
});


var connected = function( ) {
	console.log("Node server started");
}

if (process.env.VCAP_APPLICATION) {
	server.listen( process.env.PORT || 8080, "0.0.0.0", connected);
}
else {
	server.listen( 4000, connected);
}