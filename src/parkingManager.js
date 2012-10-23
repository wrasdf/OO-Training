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

	var self = this;
	var outPut = {
		parkingManager :getParkingManagerInfo(),
		parkingBoys : getParkingBoysInfo()
	};


	function getParkingManagerInfo(){
		var result = {};
		result.name = self.name;
		result.avaliableSlots = self.getAvailableSlots();
		result.parkingLots = getParkingLotsInfo(self.parkingLots);
		return result;
	}

	function getParkingBoysInfo(){
		var result = [];
		$.each(self.boys,function(i,boy){
			result.push({
				name : boy.name,
				type : boy.type,
				avaliableSlots : boy.getAvailableSlots(),
				parkingLots : getParkingLotsInfo(boy.parkingLots)
			})
		});

		return result;
	}


	function getParkingLotsInfo(parkingLots){
		var result = [];
		$.each(parkingLots,function(i,parkingLot){
			result.push({
				name : parkingLot.name,
				avaliableSlots : parkingLot.getAvailableSlots()
			});
		})
		return result;
	}

	function parkingBoysTemplate(boys){
		var result = "<ul class='boys'>"+
					"{{#parkingBoys}}"+
					"<li class='boy-title'><span class='boy-name'>{{name}}</span> : <span class='boy-type'>{{type}}</span> boy - available slots <span class='boy-slots'>{{avaliableSlots}}</span></li>"+
					"<li class='boy-details'>"+
						"<ul>"+
							"{{#parkingLots}}"+
							"<li>"+
								"<p>Parking lot name : <span class='parkinglot-name'>{{name}}</span></p>"+
								"<span><span class='parkinglot-slots'>{{avaliableSlots}}</span> available slots</span>"+
							"</li>"+
							"{{/parkingLots}}"+
						"</ul>"+
					"</li>"+
					"{{/parkingBoys}}"+
				"</ul>";
		return result;		

	}


	var template = "<div class='out-put'><h2>Parking Information</h2>"+
				"{{#parkingManager}}"+
				"<h3>Parking Manager : <span class='manager-name'>{{name}}</span> - available slots <span class='manager-slots'>{{avaliableSlots}}</span></h3>"+
				"<ul>"+
					"{{#parkingLots}}"+
					"<li>"+
						"<p>Manager name : {{name}} </p>"+
						"<span>{{avaliableSlots}} available slots</span>"+
					"</li>"+
					"{{/parkingLots}}"+
				"</ul>"+
				"{{/parkingManager}}"+
				
				"<ul class='boys'>"+
					"{{#parkingBoys}}"+
					"<li class='boy-title'><span class='boy-name'>{{name}}</span> : <span class='boy-type'>{{type}}</span> boy - available slots <span class='boy-slots'>{{avaliableSlots}}</span></li>"+
					"<li class='boy-details'>"+
						"<ul>"+
							"{{#parkingLots}}"+
							"<li>"+
								"<p>Parking lot name : <span class='parkinglot-name'>{{name}}</span></p>"+
								"<span><span class='parkinglot-slots'>{{avaliableSlots}}</span> available slots</span>"+
							"</li>"+
							"{{/parkingLots}}"+
						"</ul>"+
					"</li>"+
					"{{/parkingBoys}}"+
				"</ul>"+
				
				"</div>";

	openwin(Mustache.render(template,outPut));
	return Mustache.render(template,outPut);
}

function openwin(str) 
{
	OpenWindow=window.open("", "newwin", "height=500, width=800"); 
	OpenWindow.document.write("<HTML>"); 
	OpenWindow.document.write("<TITLE>OpenTest</TITLE>"); 
	OpenWindow.document.write("<BODY"); 
	OpenWindow.document.write(str); 
	OpenWindow.document.write("</BODY>"); 
	OpenWindow.document.write("</HTML>"); 
	OpenWindow.document.close();
} 



