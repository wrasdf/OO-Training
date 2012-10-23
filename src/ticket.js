function Ticket(options){
	var config = {
		id : guid(),
		carId : null
	};
	$.extend(config,options || {});
	this.id = config.id;	
	this.carId = config.carId;
}