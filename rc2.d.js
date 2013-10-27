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
		var file = require("fs").readFileSync("package.json","utf8"),
		  o= JSON.parse(file)
		if(!o || !o.name)
			throw "No name"
		return rc1(o.name)
	}catch(e){
	}
};

if(require.main == module){
	console.log(module.exports(process.argv[2]))
}
