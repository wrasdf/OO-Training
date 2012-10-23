function VolumeBoy(options){
	var config = {
		name : "",
		type : "volume",
		parkingLots : []
	}

	$.extend(config,options || {});
	this.name = config.name;
	this.type = config.type;
	this.parkingLots = config.parkingLots;
	
	$.extend(VolumeBoy.prototype,new BasicParkingBoy(options));
}

VolumeBoy.prototype.getAvailableParkingLot = function(){
	var self = this;
	var volumeRatio = 0;
	
	$.each(self.parkingLots, function(index,parkingLot){
		if(parkingLot.volumeRatio() > volumeRatio){
			availableParkingLot = parkingLot;
		}
	})

	return availableParkingLot;

}