#!/usr/bin/env node
var rc1= require("rc");

module.exports = function(appname, defaults){
	if(appname && (!(appname instanceof String)) && defaults === undefined){
		defaults= appname
		appname= null
	}

	if(appname)
		return rc1(appname)
	try{
		return rc1(require("package.json").name)
	}catch(e){
	}
}

if(require.main == module){
	console.log(module.exports(process.argv[2]))
}
