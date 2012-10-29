function Printer(){
	this.space =  "&nbsp;&nbsp;";
	this.managerStr = "Parking manager : He has {0} slots.<br/>";
	this.boyStr = "Parking boy. He is {0} boy and he can manager {1} slots. <br />";
	this.parkinglotStr = "Parkinglot : it has {0}/{1} slots.<br />";
}

Printer.prototype.printManager = function(manager){

	var self = this;
	var outPutStr = this.managerStr.format(manager.getAvailableSlots());

	$.each(manager.boys,function(i,boy){
		outPutStr += self.space + boy.print(self);	
	});


	$.each(manager.parkingLots,function(i,parkinglot){
		outPutStr += self.space + parkinglot.print(self);
	});

	return outPutStr
}

Printer.prototype.printBoy = function(boy){

	var self = this;
	var outPutStr = this.boyStr.format(boy.strategy.type,boy.getAvailableSlots());

	$.each(boy.parkingLots,function(i,parkinglot){
		outPutStr += self.space + parkinglot.print(self);
	});

	return outPutStr;

}

Printer.prototype.printParkingLot = function(parkinglot){
	return this.parkinglotStr.format(parkinglot.getAvailableSlots(),parkinglot.total);
}

