#!/usr/bin/env node
var rc1= require("rc");

module.exports = function(appname, defaults){
	if(appname && (!(appname instanceof String)) && defaults === undefined){
		defaults= appname
		appname= null
	}

	if(!appname){
		appname= require("./package.json").name
	}
	require.main.rcName= appname
	try{
		return require.main.rc= modulate(module)
	}catch(e){}
}

module.exports.sub= function(mod){
	return modulate(mod)
}

function modName(mod){
	var path= mod.filename,
	  a= path.lastIndexOf("/")+1,
	  b= path.lastIndexOf("."),
	  name= path.substring(a,b)
	return name
}

function modulate(mod){
	var top= require.main.rcName+"-",
	  thisName= modName(mod),
	  mods= [],
	  hist= [],
	  rv= []
	while(mod){
		mods.push(modName(mod))
		mod= mod.parent
	}
	mods[mods.length-1]= require.main.rcName
	while(mods.length){
		var mod= mods.pop()
		hist.push(mod)
		var full= hist.join("-"),
		  full2= full.substring(full.indexOf("-")+1)
		rv.unshift(full, top+mod, full2+(mods.length?"-"+thisName:""), mod)
	}
	module.exports.debug && module.exports.debug(rv)
	rv= rv.map(rc1)
	return mux(rv,require.main.rc)
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
