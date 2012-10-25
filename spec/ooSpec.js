describe("Parking lot",function(){

	var parkingLot;

	beforeEach(function() {

    	parkingLot = new ParkingLot({
			total : 5
		});

	});

	it("Given there are 3 slots. When park one car. Then there are two left.",function(){
		
		parkingLot.park(new Car());
		parkingLot.park(new Car());
		parkingLot.park(new Car());

		expect(parkingLot.getAvailableSlots()).toEqual(2);
	});

	it("Given there are 0 slots. When park one car. Then throw error.",function(){
		
		parkingLot.park(new Car());
		parkingLot.park(new Car());
		parkingLot.park(new Car());
		parkingLot.park(new Car());
		parkingLot.park(new Car());

		expect(parkingLot.park()).toEqual("There are no slot left.");
	});

	it("Given there are 3 slots. When unpark one car. Then there are 4 slots left.",function(){
		
		parkingLot.park(new Car());
		parkingLot.park(new Car({
			id : "MX12345"
		}));
		parkingLot.unpark("MX12345");
		expect(parkingLot.getAvailableSlots()).toEqual(4);
	});

	it("Given 10 slots in total for parking lot. And there are 10 slots left. When unpark one car. Then throw error.",function(){
		
		expect(parkingLot.unpark(4)).toEqual("There are no car in parking lot.")
	});

	it("Give there are 2 cars in parking lot and yours not in it. You park your car into parking lot. When you unpark your car. Then give your correct one.",function(){
		
		parkingLot.park(new Car());
		parkingLot.park(new Car());

		var yourCar = new Car({
				id : "MB12345"
			});

		parkingLot.park(yourCar);
		
		parkingLot.park(new Car({id:"MX12345"}));
		expect(parkingLot.unpark()).toEqual("You don't have Id.");
		expect(parkingLot.unpark("MB12345")).toEqual(yourCar);
		expect(parkingLot.unpark("MX12345")).not.toEqual(yourCar);
	})

});


describe("Parking boy will help us",function(){
	
	var parkingBoy;

	beforeEach(function() {

    	parkingBoy = new ParkingBoy({
    		type : "common",
			parkingLots : [
				new ParkingLot({
					total : 5
				}),
				new ParkingLot({
					total : 5
				})
			]
		});

	});

	it("Given a parking boy. When we park a car. And one hour later we will unpark our car. Then he will give our car.",function(){

		parkingBoy.park(new Car());
		parkingBoy.park(new Car());

		var yourCar = new Car({
			id : "MB12345"
		});

		var ticket = parkingBoy.park(yourCar);

		expect(parkingBoy.unpark(ticket)).toEqual(yourCar);
		
		expect(parkingBoy.unpark(new Ticket({
			id : "222"
		}))).toEqual(ParkingLotError.noCarId);

	});


	it("Given a parking boy. When we park two different cars. Then he will give us two different tickets.",function(){
		
		var ticket1 = parkingBoy.park(new Car());
		var ticket2 = parkingBoy.park(new Car());

		expect(ticket1.id).not.toEqual(ticket2.id);
		
	});



	it("Given a parking boy. When we want to park our car. Then he will tell us how many slots left.",function(){
		
		parkingBoy.park(new Car());
		parkingBoy.park(new Car());

		expect(parkingBoy.getAvailableSlots()).toEqual(8);

	});


	it("Given a parking boy. When there is no slot for us, we park a car. Then he will said error.",function(){
		
		parkingBoy = new ParkingBoy({
			type : "common",
			parkingLots : [
				new ParkingLot({
					total : 5
				})
			]
		});

		parkingBoy.park(new Car());
		parkingBoy.park(new Car());
		parkingBoy.park(new Car());
		parkingBoy.park(new Car());
		parkingBoy.park(new Car());

		expect(parkingBoy.park(new Car())).toEqual(ParkingLotError.noSlot);

	});


	it("Given a parking boy. And No parking lot for him. When we park a car. Then he will said error.",function(){
		
		parkingBoy = new ParkingBoy({
			type : "common",
			parkingLots : []
		});

		expect(parkingBoy.park(new Car())).toEqual(ParkingLotError.noParkingLot);

	})


})


describe("Parking boy can manage multiple parking lot",function(){


	var parkinglot1,parkinglot2,parkingBoy

	beforeEach(function() {

    	parkinglot1 = new ParkingLot({
			total : 2
		});

		parkinglot2 = new ParkingLot({
			total : 2
		});

		parkingBoy = new ParkingBoy({
			type : "common",
			parkingLots : [parkinglot1, parkinglot2]
		});


	});

	
	it("Given a parking boy managing 2 parking lots one has parked one car but not full, another is empty. When we want to park our car, then the car should be parked in first parking lot.",function(){
		
		parkingBoy.park(new Car());

		expect(parkinglot1.getAvailableSlots()).toEqual(1);
		expect(parkinglot2.getAvailableSlots()).toEqual(2);


		parkingBoy.park(new Car());

		expect(parkinglot1.getAvailableSlots()).toEqual(0);
		expect(parkinglot2.getAvailableSlots()).toEqual(2);

	});

	it("Given a parking boy managing 2 parkinglots, one is full but another is empty, when parking a car, it should be parked to the second parking lot", function() {
		
		

		parkingBoy.park(new Car());
		parkingBoy.park(new Car());
		parkingBoy.park(new Car());

		expect(parkinglot1.getAvailableSlots()).toEqual(0);
		expect(parkinglot2.getAvailableSlots()).toEqual(1);

	});

	it("Given a parking boy managing 2 parkinglots, both are full, when parking a car, then boy said error", function() {

		parkingBoy.park(new Car());
		parkingBoy.park(new Car());
		parkingBoy.park(new Car());
		parkingBoy.park(new Car());

		expect(parkingBoy.park(new Car())).toEqual(ParkingLotError.noSlot);

	});

	it("Given a parking boy managing 2 parkinglots, both are not full, when parking a car, then the second one left slots not changed", function() {
		
		parkinglot1.park(new Car());
		parkinglot2.park(new Car());

		parkingBoy.park(new Car())

		expect(parkinglot1.getAvailableSlots()).toEqual(0);
		expect(parkinglot2.getAvailableSlots()).toEqual(1);

	});

})


describe("Space Control Boy will help us",function(){

	var parkinglot1,parkinglot2,spaceControlBoy

	beforeEach(function() {

    	parkinglot1 = new ParkingLot({
			total : 5
		});

		parkinglot2 = new ParkingLot({
			total : 5
		});

		spaceControlBoy = new ParkingBoy({
			type : "space",
			parkingLots : [parkinglot1, parkinglot2]
		});

		parkinglot1.park(new Car());
		parkinglot1.park(new Car());
		parkinglot2.park(new Car());

	});


	it("Give a control boy managing 2 parking lots, both are not full, adn parking log2 have more slots than parking log1, when parking a car, then the car will be parked into parking lot2." ,function(){
		
		spaceControlBoy.park(new Car());

		expect(parkinglot1.getAvailableSlots()).toEqual(3);

		expect(parkinglot2.getAvailableSlots()).toEqual(3);

	});

	it("Give a control boy managing 2 parking lots, both are not full, adn parking log2 have more slots than parking log1, when parking a car and after 1 hour later, then we unpark our car, space control boy will give us correct one." ,function(){

		
		var myCar = new Car({
			id : "MB12345"
		})
		var ticket =  spaceControlBoy.park(myCar);

		expect(spaceControlBoy.unpark(ticket)).toEqual(myCar);

	})


})


describe("Volume Boy will help us",function(){

	var parkinglot1,parkinglot2,volumeBoy

	beforeEach(function() {

    	parkinglot1 = new ParkingLot({
			total : 5
		});

		parkinglot2 = new ParkingLot({
			total : 4
		});

		volumeBoy = new ParkingBoy({
			type : "volume",
			parkingLots : [parkinglot1, parkinglot2]
		});


	});

	it("Give a control boy managing 2 parking lots, when parking a car, then the car will be parked into parking lot which volume ratio is highest." ,function(){

		
		parkinglot1.park(new Car());
		parkinglot1.park(new Car());

		parkinglot2.park(new Car());

		volumeBoy.park(new Car());

		expect(parkinglot1.getAvailableSlots()).toEqual(3);

		expect(parkinglot2.getAvailableSlots()).toEqual(2);

	})


	it("Give a control boy managing 3 parking lots, when parking a car, then the car will be parked into parking lot which volume ratio is highest. And unpark correctly." ,function(){

		parkinglot1.park(new Car());
		parkinglot1.park(new Car());
		parkinglot2.park(new Car());

		var myCar = new Car({
			id : "MB12345"
		});
		var ticket = volumeBoy.park(myCar);

		expect(volumeBoy.unpark(ticket)).toEqual(myCar);

	})

});

describe("parking manager will help us",function(){


	var parkinglot1,parkinglot2

	beforeEach(function() {

    	parkinglot1 = new ParkingLot({
			total : 6
		});

		parkinglot2 = new ParkingLot({
			total : 5
		});


	});


	it("Give a parking manager and a volume parking boy, when we want to park a car, then he will let volume parking boy help us.",function(){
		

		var volumeBoy = new ParkingBoy({
			type : "volume",
			parkingLots : [parkinglot1, parkinglot2]
		});

		var parkingManager = new ParkingManager({
			boys : [volumeBoy]
		});

		parkinglot1.park(new Car());
		parkinglot1.park(new Car());
		
		parkinglot2.park(new Car());

		parkingManager.getParkingBoy({type : "volume"}).park(new Car());

		expect(parkinglot1.getAvailableSlots()).toEqual(4);
		expect(parkinglot2.getAvailableSlots()).toEqual(3);

	});

	it("Give a parking manager and a space parking boy, when we want to unpark our car, then he will let space parking boy help us. And when we want to unpark our car, then manager will let space boy unpark it.",function(){

		var spaceControlBoy = new ParkingBoy({
			type : "space",
			parkingLots : [ parkinglot1, parkinglot2 ]
		});

		var parkingManager = new ParkingManager({
			type : "manager",
			boys : [spaceControlBoy]
		});

		parkinglot1.park(new Car());
		parkinglot2.park(new Car());

		var myCar = new Car({
			id : "MB12345"
		});

		expect(parkingManager.getParkingBoy({type : "space"})).toEqual(spaceControlBoy);

		var ticket = parkingManager.getParkingBoy({type : "space"}).park(myCar);
		expect(ticket.carId).toEqual(myCar.id);

		expect(parkinglot1.getAvailableSlots()).toEqual(4);
		expect(parkinglot2.getAvailableSlots()).toEqual(4);

		expect(parkingManager.getParkingBoy({type : "space"}).unpark(ticket)).toEqual(myCar);


	});

	it("Give a parking manager but without any parking boy, when we want to park a car, then he will help us.",function(){
		
		var parkingManager = new ParkingManager({
			type : "manager",
			parkingLots : [ parkinglot1 , parkinglot2 ]
		});

		parkinglot1.park(new Car());
		parkinglot2.park(new Car());

		var myCar = new Car({
			id : "MB12345"
		});
		
		var ticket = parkingManager.park(myCar);
		expect(ticket.carId).toEqual(myCar.id);

		expect(parkinglot1.getAvailableSlots()).toEqual(4);
		expect(parkingManager.unpark(ticket)).toEqual(myCar);

	});


});


describe("Parking manager can manage parking manager",function(){

	var parkinglot1,parkinglot2,parkinglot3,parkinglot4,parkinglot5,parkinglot6;
	var parkingBoy,volumeBoy,parkingManager1,parkingManager2,parkingManagerLeader;

	beforeEach(function() {

    	parkinglot1 = new ParkingLot({
			total : 6,
			name : "parkinglot1"
		});

		parkinglot2 = new ParkingLot({
			total : 5,
			name : "parkinglot2"
		});

		parkinglot3 = new ParkingLot({
			total : 4,
			name : "parkinglot3"
		});

		parkinglot4 = new ParkingLot({
			total : 3,
			name : "parkinglot4"
		});

		parkinglot5 = new ParkingLot({
			total : 2,
			name : "parkinglot5"
		});

		parkinglot6 = new ParkingLot({
			total : 6,
			name : "parkinglot6"
		});

		parkingBoy = new ParkingBoy({
			type : "common",
			name : "Ken A",
			parkingLots : [parkinglot2]
		});

		volumeBoy = new ParkingBoy({
			name : "Jane B",
			parkingLots : [parkinglot1]
		});

		parkingManager1 = new ParkingManager({
			name : "Peter W",
			boys : [parkingBoy],
			parkingLots : [parkinglot3]
		});

		parkingManager2 = new ParkingManager({
			name : "Andeson",
			boys : [volumeBoy],
			parkingLots : [parkinglot4]
		});

		parkingManagerLeader = new ParkingManager({
			name : "Richa U",
			boys : [parkingManager1,parkingManager2],
			parkingLots : [parkinglot5,parkinglot6]
		});


	});

	it("Give three parking manager, when we have a requirement, then parking manager leader will let first manager park the car.",function(){

		var myCar = new Car({
			id : "MB1222"
		});

		var ticket1 = parkingManagerLeader.park(myCar);
		expect(parkinglot5.getAvailableSlots()).toEqual(1);
		expect(parkingManagerLeader.unpark(ticket1)).toEqual(myCar);

		var AndesonManager = parkingManagerLeader.getParkingBoy({name:"Andeson"});

		var ticket2 = AndesonManager.park(myCar);
		expect(parkinglot4.getAvailableSlots()).toEqual(2);
		expect(AndesonManager.unpark(ticket1)).toEqual(myCar);

		var KenA = parkingManagerLeader.getParkingBoy({name:"Peter W"}).getParkingBoy({name:"Ken A"});
		var ticket3 = KenA.park(myCar);
		expect(parkinglot2.getAvailableSlots()).toEqual(4);
		expect(KenA.unpark(ticket3)).toEqual(myCar);

	});


	it("Give a manager Leader, when we want to know more about his jobs, then he will print details for his job.",function(){
		console.log(parkingManagerLeader.print());
		// jasmine.getFixtures().set(outPut);
	})

});


// describe("Parking manager will help us to print the information",function(){

// 	var parkinglot1,parkinglot2,parkinglot3,parkinglot4,parkinglot5

// 	beforeEach(function() {

//     	parkinglot1 = new ParkingLot({
// 			total : 6,
// 			name : "parkinglot1"
// 		});

// 		parkinglot2 = new ParkingLot({
// 			total : 5,
// 			name : "parkinglot2"
// 		});

// 		parkinglot3 = new ParkingLot({
// 			total : 4,
// 			name : "parkinglot3"
// 		});

// 		parkinglot4 = new ParkingLot({
// 			total : 3,
// 			name : "parkinglot4"
// 		});

// 		parkinglot5 = new ParkingLot({
// 			total : 2,
// 			name : "parkinglot5"
// 		});


// 	});

// 	it("Give a parking manager, when we have a requirement, then parking manager will print all the parking lots informations.",function(){
		
// 		var parkingBoy = new ParkingBoy({
// 			name : "Ken A",
// 			parkingLots : [parkinglot2,parkinglot5]
// 		});

// 		var volumeBoy = new VolumeBoy({
// 			name : "Jane B",
// 			parkingLots : [parkinglot1,parkinglot4]
// 		});


// 		var parkingManager = new ParkingManager({
// 			name : "Peter S",
// 			boys : [parkingBoy,volumeBoy],
// 			parkingLots : [parkinglot3]
// 		});


// 		var outPut = parkingManager.print();
// 		// jasmine.getFixtures().set(outPut);
		
// 		// expect($('.out-put').find("h2").text()).toEqual("Parking Information");
// 		// expect($('.out-put').find(".manager-name").text()).toEqual("Peter S");
// 		// expect($('.out-put').find(".manager-slots").text()).toEqual("4");
// 		// expect($('.out-put').find(".boy-title").length).toEqual(2);
// 		// expect($('.out-put').find(".boy-title .boy-name").eq(0).text()).toEqual("Ken A");
// 		// expect($('.out-put').find(".boy-title .boy-type").eq(1).text()).toEqual("volume");
// 		// expect($('.out-put').find(".boy-details").eq(0).find('li .parkinglot-name').eq(0).text()).toEqual("parkinglot2");
// 		// expect($('.out-put').find(".boy-details").eq(1).find('li .parkinglot-slots').eq(1).text()).toEqual("3");

// 	})



// });



