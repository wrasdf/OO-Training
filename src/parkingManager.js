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
	
	$.extend(ParkingManager.prototype,new BasicParkingBoy(config));
	
}

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
			return this.boys[i];
		}
	}

}



ParkingManager.prototype.print = function(){


	function parkingManagerInfo(manager){
		var result = {};
		result.name = manager.name;
		result.type = manager.type;

		var parkingLots = [];
		var boys = [];

		$.each(manager.parkingLots,function(i,lot){
			parkingLots.push(parkingLotInfo(lot));
		});
		result.parkingLots = parkingLots;

		$.each(manager.boys,function(i,boy){

			if(boy.type == "manager"){
				boys.push(parkingManagerInfo(boy));
			}else{
				boys.push(parkingBoyInfo(boy));
			}
			
		});
		result.boys = boys;		
		return result;

	}

	function parkingBoyInfo(boy){
		var result = {};
		result.name = boy.name;
		result.type = boy.type;
		result.availableSlots = boy.getAvailableSlots();

		var parkingLots = [];
		$.each(boy.parkingLots,function(i,lot){
			parkingLots.push(parkingLotInfo(lot));	
		});

		result.parkingLots = parkingLots;
		return result;
	}


	function parkingLotInfo(parkinglot){
		var result = {};
		result.name = parkinglot.name;
		result.total = parkinglot.total;
		result.availableSlots = parkinglot.getAvailableSlots();
		return result;
	}



	function parkingLotTemplate(parkinglot){

		var outPutStr = "<li>Parkinglot name : <b class='parkinglot-name'>{0}</b>, it has {1}/{2} slots.</li>"
		return outPutStr.format(parkinglot.name,parkinglot.availableSlots,parkinglot.total);

	}

	function parkingBoyTemplate(boy){
		var outPutStr = "<li>Parking boy name : <b class='boy-name'>{0}</b>. He is {1} boy and he can manager {2} slots.";
		outPutStr += "<ul>";
		$.each(boy.parkingLots,function(i,parkinglot){
			outPutStr += parkingLotTemplate(parkinglot);
		});
		outPutStr += "</ul></li>";
		return outPutStr.format(boy.name,boy.type,boy.availableSlots);
	}

	function parkingManagerTemplate(manager){
		

		outPutStr += "<ul>";
		var outPutStr = "<li>Parking manager name : <b class='manager-name'>{0}</b>. He has {1} slots.</li>";
		
		outPutStr += "<li><ul>";
		$.each(manager.boys,function(i,boy){
			if(boy.type == "manager"){
				outPutStr += parkingManagerTemplate(boy);
			}else{
				outPutStr += parkingBoyTemplate(boy);	
			}
		});
		outPutStr += "</ul></li><li><ul>";

		$.each(manager.parkingLots,function(i,parkinglot){
			outPutStr += parkingLotTemplate(parkinglot);
		});

		outPutStr += "</ul></li>";

		return outPutStr.format(manager.name,manager.availableSlots);
	}

	var outPut = "<ul>"+parkingManagerTemplate(this)+"</ul>";
	// openwin(outPut);
}

function openwin(str) 
{
	OpenWindow=window.open("", "newwin", "height=500, width=800"); 
	OpenWindow.document.write("<HTML>"); 
	OpenWindow.document.write("<TITLE>OpenTest</TITLE>");
	OpenWindow.document.write("<style type='text/css'>ul,li{list-style:none;}</style>"); 
	OpenWindow.document.write("<BODY"); 
	OpenWindow.document.write(str); 
	OpenWindow.document.write("</BODY>"); 
	OpenWindow.document.write("</HTML>"); 
	OpenWindow.document.close();
} 



