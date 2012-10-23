function ParkingBoy(options){
	var config = {
		name : "",
		type : "common",
		parkingLots : []
	}

	$.extend(config,options || {});
	this.name = config.name;
	this.type = config.type;
	this.parkingLots = config.parkingLots;
	
	$.extend(ParkingBoy.prototype,new BasicParkingBoy(config));

}

ParkingBoy.prototype.calculate = function(total,used){
	return total == used;
}

ParkingBoy.prototype.getAvailableParkingLot = function(){
	
	for(var i=0; i<this.parkingLots.length; i++){
		if(!this.parkingLots[i].isEmpty()){
			return this.parkingLots[i];
		}
	}

}