function Strategy(options){
	var config = {
		type : ""
	}
	$.extend(config,options);
	this.type = config.type;
	this.parkingLots = config.parkingLots;
}

Strategy.prototype.getAvailableParkingLot = function(){

}



