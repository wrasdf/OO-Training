function guid() {
    function S4() {
       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()); 
}

String.prototype.format = function(args){
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 0);
    return this.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
};

var Utility = {
	extend :  function(subClass, baseClass){
		
		function inheritance() { }
	    
	    inheritance.prototype = baseClass.prototype;
	    subClass.prototype = new inheritance();
	    subClass.prototype.constructor = subClass;

	    subClass.baseConstructor = baseClass;
	    subClass.superClass = baseClass.prototype;
	     
	},
	openWin : function(str){
		var OpenWindow = window.open("_blank", "newwin", "height=500, width=800"); 
		OpenWindow.document.write("<html>"); 
		OpenWindow.document.write("<title>Print Parking Manager Information</title>");
		OpenWindow.document.write("<body>"); 
		OpenWindow.document.write(str); 
		OpenWindow.document.write("</body>"); 
		OpenWindow.document.write("</html>"); 
		OpenWindow.document.close();
	}
}
