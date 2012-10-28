function ParkingManager(options){

	var config = {
		name : "",
		boys : [],
		parkingLots : []
	};

	$.extend(config,options || {});
	this.boys = config.boys;
	this.parkingLots = config.parkingLots;
	this.printStr = new Print();

}

ParkingManager.prototype.getAvailableSlots = function(){
	
	var self = this;
	var availableSlots = 0;

	$.each(self.boys,function(index,boy){
		availableSlots += boy.getAvailableSlots();		
	});	

	$.each(self.parkingLots,function(index,parkinglot){
		availableSlots += parkinglot.getAvailableSlots();	
	})

	return availableSlots;

}


ParkingManager.prototype.park = function(car){
	
	var self = this;

	function boysPark(car){

		if(self.boys.length == 0){
			return parkingLotPark(car);
		}

		var availableBoy = null

		$.each(self.boys,function(index,boy){
			if(boy.getAvailableSlots() != 0){
				availableBoy = boy;
				return false;
			}
		});

		if(!availableBoy){
			return parkingLotPark(car);
		}

		return availableBoy.park(car);

	}

	function parkingLotPark(car){
		
		if(self.parkingLots.length == 0){
			return ParkingLotError.noParkingLot
		}

		var availableParkingLot = null;

		$.each(self.parkingLots,function(index,parkinglot){
			if(parkinglot.getAvailableSlots() != 0){
				availableParkingLot = parkinglot;
				return false;
			}
		})

		if(!availableParkingLot){
			return ParkingLotError.noSlot
		}

		availableParkingLot.park(car);

		return new Ticket({
			carId : car.id
		})

	}

	return boysPark(car);

}

ParkingManager.prototype.unpark = function(ticket){

	var self = this;

	function boyUnpark(ticket){

		if(self.boys.length == 0){
			return parkingLotUnpark(car);
		}

		var unparkCar = null
		$.each(self.boys,function(index,boy){
			unparkCar = boy.unpark(ticket);
			if(unparkCar.id == ticket.carId){
				return false;
			}
		});
		if(!unparkCar.id){
			return parkingLotUnpark(ticket);
		}

		return unparkCar;
	}

	function parkingLotUnpark(ticket){

		if(self.parkingLots.length == 0){
			return ParkingLotError.noParkingLot
		}

		var unparkCar = null;

		$.each(self.parkingLots,function(index,parkinglot){
			unparkCar = parkinglot.unpark(ticket.carId);
			if(unparkCar.id == ticket.carId){
				return false;
			}

		});

		if(!unparkCar.id){
			return ParkingLotError.noCar;
		}

		return unparkCar;
	}

	return boyUnpark(ticket);

}

ParkingManager.prototype.print = function(){

	var self = this;

	var outPutStr = this.printStr.managerStr.format(this.getAvailableSlots());
	
	$.each(self.boys,function(i,boy){
		outPutStr += self.printStr.space + boy.print();	
	});


	$.each(self.parkingLots,function(i,parkinglot){
		outPutStr += self.printStr.space + parkinglot.print();
	});

	return outPutStr
	
}




