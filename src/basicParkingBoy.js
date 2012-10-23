function BasicParkingBoy (options){
	var config = {
		parkingLots : [],
		name : ""
	}
	
	$.extend(config,options||{});

	this.parkingLots = config.parkingLots;
	this.name = config.name;

}

BasicParkingBoy.prototype.park = function(car){

	if(!this.parkingLots.length){
		return ParkingLotError.noParkingLot;
	}

	if(!this.getAvailableSlots()){
		return ParkingLotError.noSlot;
	}

	this.getAvailableParkingLot().park(car);

	return new Ticket({
		carId : car.id
	})
}

BasicParkingBoy.prototype.unpark = function(ticket){

	var total = function(parkingLots) {

		var allSlots = 0;

		for(var i=0; i<parkingLots.length; i++){
			allSlots += parkingLots[i].total;
		}

		return allSlots;	

        // garbage
		// return parkingLots.reduce(0, function(s, v){ s+=v.total})		
	}

	if(this.parkingLots.length == 0){
		return ParkingLotError.noParkingLot;
	}

	if(this.getAvailableSlots() == total(this.parkingLots)){
		return ParkingLotError.noCar;
	}	

	var self = this;
	var unParkCar = null;

	$.each(self.parkingLots, function(index,parkinglot){

		if(parkinglot.getCarIndexInParkingLot(ticket.carId) || parkinglot.getCarIndexInParkingLot(ticket.carId) == 0){
			unParkCar = parkinglot.unpark(ticket.carId);
			return true;
		}

	});

	if(!unParkCar){
		return ParkingLotError.noCarId;
	}

	return unParkCar;

}

BasicParkingBoy.prototype.getAvailableSlots = function(){
	
	var allCanUsedSlots = 0;

	if(this.parkingLots.length == 0){
		return 0;
	}

	var self = this;

	$.each(self.parkingLots,function(index,parkingLot){
		allCanUsedSlots += parkingLot.getAvailableSlots();
	});

	return allCanUsedSlots;	

}

