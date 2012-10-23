function Car(options){
	var config = {
		id : guid()
	}
	$.extend(config,options || {});
	this.id = config.id;
}