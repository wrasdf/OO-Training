function ParkingBoy (options){
	var config = {
		parkingLots : [],
		name : "",
		type : ""
	}
	
	$.extend(config,options||{});

	this.name = config.name;
	this.type = config.type;
	this.parkingLots = config.parkingLots;

}

ParkingBoy.prototype.park = function(car){

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

ParkingBoy.prototype.getAvailableParkingLot = function(){
		
	return new StrategyParkingLot({
		type : this.type,
		parkingLots : this.parkingLots
	}).getAvailableParkingLot();

}

ParkingBoy.prototype.getAvailableSlots = function(){
	
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

ParkingBoy.prototype.printObj = function(){
	var result = {} , self = this;
	result.name = this.name;
	result.type = this.type;
	result.availableSlots = this.getAvailableSlots();

	var parkingLots = [];
	$.each(self.parkingLots,function(i,lot){
		parkingLots.push(parkingLotInfo(lot));	
	});

	result.parkingLots = parkingLots;
	return result;
}

ParkingBoy.prototype.print = function(){
	var self = this;
	var outPutStr = "<li>Parking boy name : <b class='boy-name'>{0}</b>. He is {1} boy and he can manager {2} slots.";
		outPutStr += "<ul>";
		$.each(self.parkingLots,function(i,parkinglot){
			outPutStr += parkinglot.print();
		});
		outPutStr += "</ul></li>";
	return outPutStr.format(self.name,self.type,self.availableSlots);
}



