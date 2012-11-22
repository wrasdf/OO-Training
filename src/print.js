function Printer(){
	this.space =  "&nbsp;&nbsp;";
}

Printer.prototype.spaceTimes = function(n){
	var result = "";
	for(var i=0; i<n; i++){
		result += this.space;
	}
	return result;
}

Printer.prototype.spaceNumber = function(n){
	if(!n && n !=0){
		n = 0 ;
	}else{
		n ++;
	}
	return n;
}

Printer.prototype.printManager = function(manager,n){

	var self = this;
	var times = this.spaceNumber(n);
	var allSpaces = this.spaceTimes(times);
	
	var outPutStr = allSpaces + manager.printer.format(manager.getAvailableSlots());

	$.each(manager.boys,function(i,boy){
		outPutStr += boy.print(self,times);	
	});

	$.each(manager.parkingLots,function(i,parkinglot){
		outPutStr += parkinglot.print(self,times);
	});

	return outPutStr
}

Printer.prototype.printBoy = function(boy,n){

	var self = this;
	var times = this.spaceNumber(n);
	var allSpaces = this.spaceTimes(times);

	var outPutStr = allSpaces + boy.printer.format(boy.strategy.type,boy.getAvailableSlots());

	$.each(boy.parkingLots,function(i,parkinglot){
		outPutStr += parkinglot.print(self,times);
	});

	return outPutStr;

}

Printer.prototype.printParkingLot = function(parkinglot,n){
	var times = this.spaceNumber(n);
	var allSpaces = this.spaceTimes(times);
	
	return allSpaces + parkinglot.printer.format(parkinglot.getAvailableSlots(),parkinglot.total);
}

