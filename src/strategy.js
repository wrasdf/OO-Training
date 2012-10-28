function CommonStrategy(){
	this.type = "common";
}


CommonStrategy.prototype.getAvailableParkingLot = function(parkingLots){

	for(var i=0; i<parkingLots.length; i++){
		if(!parkingLots[i].isEmpty()){
			return parkingLots[i];
		}
	}

}

function VolumeStrategy(){
	this.type = "volume";
}

VolumeStrategy.prototype.getAvailableParkingLot = function(parkingLots){

	var volumeRatio = 0;
	var availableParkingLot = null;
	
	$.each(parkingLots, function(index,parkingLot){
		if(parkingLot.volumeRatio() > volumeRatio){
			availableParkingLot = parkingLot;
		}
	})

	return availableParkingLot;

}

function SpaceStrategy(){
	this.type = "space";
}

SpaceStrategy.prototype.getAvailableParkingLot = function(parkingLots){

	var availableParkingLot = null;
	var maxAvailableSlots = 0;

	$.each(parkingLots,function(index,parkingLot){
		var parkingLotSlots = parkingLot.getAvailableSlots();
		if(parkingLotSlots > maxAvailableSlots){
			maxAvailableSlots = parkingLotSlots;
			availableParkingLot = parkingLot;
		}
	});

	return availableParkingLot;

}



