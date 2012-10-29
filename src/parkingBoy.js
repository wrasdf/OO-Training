function ParkingBoy (options){
	var config = {
		parkingLots : [],
		strategy : null
	}

	$.extend(config,options||{});

	this.parkingLots = config.parkingLots;
	this.strategy = config.strategy;

}

ParkingBoy.volumeParkingBoy = function(parkingLots){
	return new ParkingBoy({
		parkingLots : parkingLots,
		strategy: new VolumeStrategy()
	});
};

ParkingBoy.spaceParkingBoy = function(parkingLots){
	return new ParkingBoy({
		parkingLots : parkingLots,
		strategy: new SpaceStrategy()
	});
};

ParkingBoy.commonParkingBoy = function(parkingLots){
	return new ParkingBoy({
		parkingLots : parkingLots,
		strategy: new CommonStrategy()
	});
};

ParkingBoy.prototype.park = function(car){

	if(!this.parkingLots.length){
		return ParkingLotError.noParkingLot;
	}

	if(!this.getAvailableSlots()){
		return ParkingLotError.noSlot;
	}

	this.strategy.getAvailableParkingLot(this.parkingLots).park(car);

	return new Ticket({
		carId : car.id
	})
}

ParkingBoy.prototype.unpark = function(ticket){

	var total = function(parkingLots) {

		var allSlots = 0;

		for(var i=0; i<parkingLots.length; i++){
			allSlots += parkingLots[i].total;
		}

		return allSlots;	

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



ParkingBoy.prototype.getAvailableSlots = function(){
	
	var allCanUsedSlots = 0;

	if(this.parkingLots.length == 0){
		return 0;
	}

	var self = this;

	$.each(self.parkingLots,function(index,parkinglot){
		allCanUsedSlots += parkinglot.getAvailableSlots();
	});

	return allCanUsedSlots;	

}

ParkingBoy.prototype.print = function(printer){
	return printer.printBoy(this);
}



