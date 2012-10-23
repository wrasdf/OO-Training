function SpaceControlBoy(options){
	var config = {
		name : "",
		type : "space",
		parkingLots : []
	}

	$.extend(config,options || {});
	this.name = config.name;
	this.type = config.type;
	this.parkingLots = config.parkingLots;
	
	$.extend(SpaceControlBoy.prototype,new BasicParkingBoy(options));
}


SpaceControlBoy.prototype.calculateData = function(total,used){
	return total;
}

SpaceControlBoy.prototype.getAvailableParkingLot = function(){

	var availableParkingLot = null;
	var maxAvailableSlots = 0;
	var self = this;

	$.each(self.parkingLots,function(index,parkingLot){
		var parkingLotSlots = parkingLot.getAvailableSlots();
		if(parkingLotSlots > maxAvailableSlots){
			maxAvailableSlots = parkingLotSlots;
			availableParkingLot = parkingLot;
		}
	});

	return availableParkingLot;

}

