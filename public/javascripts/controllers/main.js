(function() {
	var app = angular.module('visualMenu', [])

	app.controller('restaurantController', ['$http', function($http) {
		var uri = "http://localhost:3000/api/";
		var restaurant = this;
		restaurant.searchName = "";
		restaurant.searchLocation = "";
		restaurant.name = "";
		restaurant.address = "";
		restaurant.results = [];

		//TODO: Remove spaces if search has spaces???

		restaurant.searchRestaurants = function() {
			restaurant.results = [];
			var url = uri + "search?name=" + restaurant.searchName + "&location=" + restaurant.searchLocation;
			console.log(url);
			$http.get(url)
				.success(function(data) {
					restaurant.results = data;
				});
			restaurant.searchName = "";
			restaurant.searchLocation = "";
		}

		restaurant.selectRestaurant = function(selectedRestaurant) {
			var url = uri + "select";
			// console.log(url);
			// $http.get(url, [params: selectedRestaurant])
			console.log("stuff", selectedRestaurant)
			// $http.get({url: url, params: selectedRestaurant})
			$http.get(url)
				.success(function(data) {
					console.log("YO TEST");
					restaurant.results = [];
					console.log(data);
					restaurant.name = data.name;
					restaurant.address = data.address;
				});
			// get the restaurant info for the selected restaurant
			// BUT if not in database, create (in which case I need to pass a body...)
		}

		restaurant.searchImages = function() {
			restaurant.results = [];
			var url = uri + "images?restaurant=" + restaurant.searchName + "&menuitem=kalua+pork";
			console.log(url);
			$http.get(url)
				.success(function(data) {
					console.log("yo")
				});
			restaurant.searchName = "";
			restaurant.searchLocation = "";
		}
	}]);
})();
