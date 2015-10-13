(function() {
	var app = angular.module('visualMenu', [])

	app.controller('restaurantController', ['$http', function($http) {
		var restaurant = this;
		restaurant.results = [];
		$http.get('http://localhost:3000/api/search?name=teddy\'s%20burgers&location=honolulu')
			.success(function(data) {
				restaurant.results = data;
			});
	}]);
})();
