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
		return require.main.rc= rc1(appname)
	}catch(e){}
}

module.exports.sub= function(mod){
	return mux(modulate(mod))
}

function modName(mod){
	var path= mod.filename,
	  a= path.lastIndexOf("/")+1,
	  b= path.lastIndexOf("."),
	  name= path.substring(a,b)
	return name
}

function modulate(mod){
	var mods= [],
	  hist= []
	  rv= []
	while(mod){
		mods.push(mod)
		mod= mod.parent
	}
	while(mods.length){
		var name= modName(mods.pop())
		hist.push(name)
		var full= hist.join("-")
		rv.push(rc1(full), rc1(rc1(name), require.main.rcName+"-"+full))
	}
	return rv
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
