var myapp = angular.module('app', []);
myapp.controller('rootComponent', function() {
    this.occupied = 0
});

var cars = this.cars = [];
var avail_parking = 5;
//var occupied = 0;
myapp.component('park', {
    template: `<div class="left_container">
	<h2>Car Parking Application</h2>
		<form>
			<input type="text" ng-model="$ctrl.car_number" required /><br/><br/>
			<input type="text" ng-model="$ctrl.p_name" /><br/><br/>
			<button ng-click="$ctrl.park_car()">Park</button><br/><br/>
			<div ng-show="$ctrl.show_success"><b class="success">Car parked successfully</b></div>
		</form>	<br/>
<ul ng-repeat="car in $ctrl.cars">
		<li>{{car}}</li>
	</ul>		
	</div>	
	
	
	`,

    controller: function() {
        this.car_number = "KA001";
		this.cars = cars;
        //Park car starts

        //Onclick of parkcar button call ParkCar Function
        this.park_car = function() {
            this.show_success = false;
            if (cars.length < avail_parking) {

                if (cars.indexOf(this.car_number) !== -1) {
                    alert("Try with different Car number");
                    return false;
                }
                cars.push(this.car_number);
                this.show_success = true;
            } else {
                alert("Reached Max limits");
            }
            console.log(cars);
            this.occupied = cars.length;          
            
            this.onViewChange({
                $event: {
                    occupied: this.occupied 
                }
            })
        }
    },
    bindings: {
        occupied: '<',
        onViewChange: '&'
    }
});

myapp.component('updateStatus', {
    template: `<div class="right_col">
	<h1>Status</h1>
	Total: {{$ctrl.avail_parking}} <br/>	
	Occupied: {{ $ctrl.occupied }} <br/>
	Available: {{$ctrl.avail_parking - $ctrl.occupied }}
	
	</div>
	<div class="clear"></div>`,
    bindings: {
        occupied: '<'
    },
	controller: function(){
	this.avail_parking = 5;		
	}
});


myapp.component('unPark', {
    bindings: {
        occupied: '<',
        onViewChange: '&'
    },
    template: `<hr/>
		Car number: <input type="text" ng-model="$ctrl.unpark_number" /> <button ng-click="$ctrl.remove_car()"> Unpark</button>		
		<div ng-show="$ctrl.unpark_success"><b class="unpark">Car Unparked successfully</b></div>`,
    controller: function() {
        var $ctrl = this;
        $ctrl.remove_car = function() {
            $ctrl.unpark_success = false;
            if (cars.indexOf($ctrl.unpark_number) !== -1) {
                var index = cars.indexOf($ctrl.unpark_number);
                cars.splice(index, 1);
                console.log("remaining: ", cars);
                $ctrl.unpark_success = true;
                var s = cars.length;
                this.onViewChange({ $event: {occupied: s }});
            } else {
                console.log("not found");
            }
        }
    }
});