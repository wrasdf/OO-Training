function StrategyParkingLot(options){
	var config = {
		type : "",
		parkingLots : []
	}
	$.extend(config,options);
	this.type = config.type;
	this.parkingLots = config.parkingLots;
}

StrategyParkingLot.prototype.getAvailableParkingLot = function(){

	if(this.type == 'common' ||  this.type == 'manager'){
		for(var i=0; i<this.parkingLots.length; i++){
			if(!this.parkingLots[i].isEmpty()){
				return this.parkingLots[i];
			}
		}
	}

	if(this.type == 'volume'){

		var self = this;
		var volumeRatio = 0;
		var availableParkingLot = null;
		
		$.each(self.parkingLots, function(index,parkingLot){
			if(parkingLot.volumeRatio() > volumeRatio){
				availableParkingLot = parkingLot;
				return true;
			}
		})

		return availableParkingLot;
	}

	if(this.type == 'space'){

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

	return null;
}



