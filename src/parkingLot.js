var ParkingLot = function(total){
	
	var config = {
		total : 10
	};

	this.total = total || config.total;
	this.used = [];
	this.printer = "Parkinglot : it has {0}/{1} slots.<br/>"
};

ParkingLot.prototype.calculateDataByNeed = function(boy){
	boy.calculateData(this.total,this.used);
}

ParkingLot.prototype.park = function(car){
	
	if(this.used.length + 1 <= this.total){
		this.used.push(car);
		return car;
	}

	return ParkingLotError.noSlot;
	
}

ParkingLot.prototype.getCarIndexInParkingLot = function(id){
	
	var self = this;
	var unparkCarIndex = null;

	$.each(self.used,function(index,car){
		if(id === car.id){
			unparkCarIndex = index;
			return true;
		}
		
	});

	return unparkCarIndex;

}

ParkingLot.prototype.unpark = function(id){

	if(!id){
		return ParkingLotError.noId;
	}

	if(this.used.length <= 0 ){
		return ParkingLotError.noCar;	
	}

	var unparkCarIndex = this.getCarIndexInParkingLot(id);

	if(!unparkCarIndex && unparkCarIndex != 0){
		return ParkingLotError.noCar;	
	}

	return this.used.splice(unparkCarIndex,1)[0];
	
}

ParkingLot.prototype.isEmpty = function(){
	return this.used.length == this.total;
}

ParkingLot.prototype.getAvailableSlots = function(){
	return this.total - this.used.length;
}

ParkingLot.prototype.volumeRatio = function(){
	return 	this.used.length/this.total;
}

ParkingLot.prototype.print = function(printer,n){
	return printer.printParkingLot(this,n);
}












