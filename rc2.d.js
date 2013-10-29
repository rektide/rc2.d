#!/usr/bin/env node
var rc1= require("rc");

module.exports = function(appname, defaults){
	if(appname && (!(appname instanceof String)) && defaults === undefined){
		defaults= appname
		appname= null
	}

	if(!appname){
		appname= require("package.json").name
	}
	require.main.rcName= appname
	try{
		return rc1(appname)
	}catch(e){}
}

module.exports.sub= function(mod){
	
}

function mux(){
	var o= {}
	for(var i= arguments.length; i>= 0; --i){
		for(var j in arguments[i]){
			o[j]= arguments[i][j]
		}
	}
	return o
}

if(require.main == module){
	console.log(module.exports(process.argv[2]))
}
