function ParkingManager(options){
	var config = {
		name : "",
		type : "manager",
		boys : [],
		parkingLots : []
	};

	$.extend(config,options || {});
	this.name = config.name;
	this.type = config.type;
	this.boys = config.boys;
	this.parkingLots = config.parkingLots;

}

Utility.extend(ParkingManager, ParkingBoy);

ParkingManager.prototype.getAvailableParkingLot = function(){

	for(var i=0; i<this.parkingLots.length; i++){
		if(this.parkingLots[i].getAvailableSlots() != 0){
			return this.parkingLots[i];
		}
	}

}

ParkingManager.prototype.getParkingBoy = function(options){

	if(!this.boys){
		return ParkingLotError.noBoys;
	}

	if(this.boys.length == 0){
		return ParkingLotError.noBoys;
	}

	if(!options){
		return this.boys[0];
	}

	var result = "";
	for(var i in options){
		result = i;
	}

	for(var i =0 ; i< this.boys.length; i++){
		if(this.boys[i][result] == options[result]){
			if(this.boys[i].getAvailableSlots() != 0){
				return this.boys[i];	
			}
		}
	}

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



