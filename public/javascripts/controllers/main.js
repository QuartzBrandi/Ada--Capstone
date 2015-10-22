(function() {
	// var app = angular.module('visualMenuControllers', ['config'])
	// var app = angular.module('visualMenuControllers', [ ])
	var app = angular.module('visualMenu', ['ngRoute'])

	app.config(function($routeProvider) {
			$routeProvider

					// route for the home page
					.when('/', {
							templateUrl : 'pages/home.html',
							// controller  : 'mainController'
					})

					// route for the about page
					.when('/about', {
							templateUrl : 'pages/about.html',
							// controller  : 'aboutController'
					})

					// route for the contact page
					.when('/contact', {
							templateUrl : 'pages/contact.html',
							// controller  : 'contactController'
					});
	});

	// app.controller('restaurantController', ['$http', function($http, config) {
	app.controller('restaurantController', ['$http', function($http) {

		// TODO: Figure out how to handle the environment in Angular.
		// var uri = process.env.NODE_ENV == "production" ? "https://www.picto-menu.com/api/restaurants/" : "http://localhost:3000/api/restaurants/";
			// console.log(GOOGLE_OAUTH_CLIENT_ID);
		var uri = "http://localhost:3000/api/restaurants/";
		var restaurant = this;
		restaurant.searchName = "";
		restaurant.searchLocation = "";
		restaurant.addMenuItem = "";
		restaurant.addMenuType = "";
		restaurant.addMenuSection = "";
		restaurant.addMenuSubsection = "";
		restaurant.addMenuImage = "";
		restaurant.name = "";
		restaurant.address = "";
		restaurant.results = [];

		//TODO: Remove spaces if search has spaces???

		restaurant.reset = function() {
			restaurant.searchName = "";
			restaurant.searchLocation = "";
			restaurant.addMenuItem = "";
			restaurant.addMenuType = "";
			restaurant.addMenuSection = "";
			restaurant.addMenuSubsection = "";
			restaurant.addMenuImage = "";
			restaurant.name = "";
			restaurant.address = "";
			restaurant.results = [];
			restaurant.menus = [];
			restaurant.menu_origin = "";
		}

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
					restaurant.menus = data.menus || [];
					restaurant.menu_origin = data.menu_origin;
					// restaurant.allItems();
					console.log(restaurant.menus[0]);
					console.log(restaurant.menus[0].sections[0].subsections[0].items);
				});
			// get the restaurant info for the selected restaurant
			// BUT if not in database, create (in which case I need to pass a body...)
		}

		restaurant.allItems = function() {
			restaurant.items = [];
			// for (var i = 0; i < restaurant.menus; i++)
			restaurant.items = restaurant.menus[0].sections[0].subsections[0].items;
		}

		// restaurant.carouselImages = function(menuitem) {
		// 	return menuitem.images[1..-1];
		// }

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

	app.controller('userController', ['$http', '$scope', function($http, $scope) {
		var user = this;
		var uri = "http://localhost:3000/api/users/";
		user.name = "";
		user.logged_in = false;
		user.information = {};
		user.profile = false;

		user.reset = function() {
			user.name = "";
			user.logged_in = false;
			user.information = {};
		}

		// For Google OAuth:
		function onSignIn(googleUser) {
			var name = googleUser.getBasicProfile().getName();
			var email = googleUser.getBasicProfile().getEmail();
			var id_token = googleUser.getAuthResponse().id_token;
			console.log(id_token);
			console.log(typeof(id_token));
			user.name = name;
			var url = uri + "login";
			$http({method: "GET", url: url, params: {
				id_token: id_token,
				name: name,
				email: email
			}})
				.success(function(data) {
					user.information = data;
					user.logged_in = true;
				});

			$scope.$digest(); // refreshes two-way-biding? (without this there was a delay to update)
			// OR USE...
			// $scope.$apply();
			// TODO: Figure out what the difference is between digest & apply.
		}
		window.onSignIn = onSignIn;

		user.config = function() {
			console.log("hi!!");
		}
	}]);
})();
