(function() {
	var app = angular.module('visualMenu', [])

	app.controller('restaurantController', ['$http', function($http) {
		var restaurant = this;
		restaurant.search = "";

		restaurant.searchRestaurants = function() {
			restaurant.results = [];
			var url = "http://localhost:3000/api/search?name=" + restaurant.search + "&location=honolulu";
			$http.get(url)
				.success(function(data) {
					restaurant.results = data;
				});
			restaurant.search = "";
		}
	}]);

})();
