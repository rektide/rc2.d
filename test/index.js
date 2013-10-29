var rc= require("../rc2.d")
rc.debug= function(t){console.log(t)}
rc()
require("./a")
require("./b")
