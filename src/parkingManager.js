function ParkingManager(options){

	var config = {
		name : "",
		boys : [],
		parkingLots : []
	};

	$.extend(config,options || {});
	this.boys = config.boys;
	this.type = "manager";
	this.parkingLots = config.parkingLots;

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

ParkingManager.prototype.printObj = function(){

	var result = {} , self = this;
	result.name = this.name;
	result.type = this.type;

	var parkingLots = [];
	var boys = [];

	$.each(self.parkingLots,function(i,lot){
		parkingLots.push(lot.printObj);
	});

	result.parkingLots = parkingLots;

	$.each(self.boys,function(i,boy){
		boys.push(self.printObj());
	});

	result.boys = boys;		

	return result;	
}

ParkingManager.prototype.print = function(){

	var outPutStr = "<ul>", self = this;
	
	outPutStr += "<li>Parking manager name : <b class='manager-name'>{0}</b>. He has {1} slots.</li>";
	
	outPutStr += "<li><ul>";
	
	$.each(self.boys,function(i,boy){
		outPutStr += boy.print();	
	});

	outPutStr += "</ul></li><li><ul>";

	$.each(self.parkingLots,function(i,parkinglot){
		outPutStr += parkinglot.print();
	});

	outPutStr += "</ul></li>";

	outPutStr = outPutStr.format(this.name,this.availableSlots);


	return outPutStr
	// openwin(outPut);
}

function openwin(str) 
{
	OpenWindow=window.open("", "newwin", "height=500, width=800"); 
	OpenWindow.document.write("<html>"); 
	OpenWindow.document.write("<title>OpenTest</title>");
	OpenWindow.document.write("<style type='text/css'>ul,li{list-style:none;}</style>"); 
	OpenWindow.document.write("<body"); 
	OpenWindow.document.write(str); 
	OpenWindow.document.write("</body>"); 
	OpenWindow.document.write("</html>"); 
	OpenWindow.document.close();
} 



