(function() {
	var app = angular.module('visualMenu', [])

	app.controller('restaurantController', ['$http', function($http) {
		// TODO: Figure out how to handle the environment in Angular.
		// var uri = process.env.NODE_ENV == "production" ? "https://www.picto-menu.com/api/restaurants/" : "http://localhost:3000/api/restaurants/";
		var uri = "http://localhost:3000/api/restaurants/";
		var restaurant = this;
		restaurant.searchName = "";
		restaurant.searchLocation = "";
		restaurant.name = "";
		restaurant.address = "";
		restaurant.results = [];

		//TODO: Remove spaces if search has spaces???

		restaurant.search = function() {
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

		restaurant.select = function(selectedRestaurant) {
			var url = uri + "select";
			$http({method: "GET", url: url, params: selectedRestaurant})
				.success(function(data) {
					restaurant.results = [];
					restaurant.name = data.name;
					restaurant.address = data.address;
					restaurant.menu = data.menu;
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
