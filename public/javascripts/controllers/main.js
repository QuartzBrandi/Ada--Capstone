(function() {
	var app = angular.module('visualMenu', [])

	app.controller('restaurantController', ['$http', function($http) {
		var restaurant = this;
		restaurant.searchName = "";
		restaurant.searchLocation = "";

		//TODO: Remove spaces if search has spaces???

		restaurant.searchRestaurants = function() {
			restaurant.results = [];
			var url = "http://localhost:3000/api/search?name=" + restaurant.searchName + "&location=" + restaurant.searchLocation;
			$http.get(url)
				.success(function(data) {
					restaurant.results = data;
				});
			restaurant.searchName = "";
			restaurant.searchLocation = "";
		}

		restaurant.searchImages = function() {
			restaurant.results = [];
			var url = "http://localhost:3000/api/images?restaurant=" + restaurant.searchName + "&menuitem=kalua+pork";
			$http.get(url)
				.success(function(data) {
					console.log("yo")
				});
			restaurant.searchName = "";
			restaurant.searchLocation = "";
		}
	}]);
})();
