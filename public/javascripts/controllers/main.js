(function() {
	// var app = angular.module('visualMenuControllers', ['config'])
	// var app = angular.module('visualMenuControllers', [ ])
	var app = angular.module('visualMenu', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap'])

	var uriSite = "http://localhost:3000/"

	// TODO: Get rid of the little # in the URL...?
	app.config(function($routeProvider) {
		console.log("hy");
			$routeProvider

					// route for the home page
					.when('/', {
							templateUrl : 'pages/home.html'
							// controller  : 'mainController'
					})

					.when('/menu/:name/:address', {
						templateUrl: 'pages/menu.html',
						controller: 'theRestaurantController'
					})

					.when('/profile', {
						templateUrl: 'pages/profile.html'
					})

					// route for the about page
					.when('/about', {
							templateUrl : 'pages/about.html'
							// controller  : 'aboutController'
					})

					// route for the contact page
					.when('/contact', {
							templateUrl : 'pages/contact.html'
							// controller  : 'contactController'
					})

					.otherwise({
						redirectTo: '/'
					});
	});

	app.controller('CarouselDemoCtrl', function ($scope) {

		$scope.carouselMenus = function(menus) {
			console.log("hi")
		}

		// console.log("hi")
	  $scope.myInterval = -1;
	  $scope.noWrapSlides = false;
	  // var slides = $scope.slides = [];
	  // $scope.addSlide = function() {
	  //   var newWidth = 600 + slides.length + 1;
	  //   slides.push({
	  //     image: '//placekitten.com/' + newWidth + '/300',
	  //     text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
	  //       ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
	  //   });
	  // };
	  // for (var i=0; i<4; i++) {
	  //   $scope.addSlide();
	  // }
	});

	app.controller("testController", function() {
		this.dog = "testing stuff";
	})

	app.controller('menuController', function() {
		var ctrl = this;
		ctrl.menu = 0;
		ctrl.section = 0;
		ctrl.subsection = 0;

		ctrl.changeMenu = function(index) {
			ctrl.menu = index;
			ctrl.section = 0;
			ctrl.subsection = 0;
		}

		ctrl.changeSection = function(index) {
			ctrl.section = index;
			ctrl.subsection = 0;
		}

		ctrl.changeSubsection = function(index) {
			ctrl.subsection = index;
		}
	});

	app.controller('theRestaurantController', ['$http', '$scope', '$route', function($http, $scope, $route) {
		$scope.loading = true;
		var uriRoute = "api/restaurants/";
		var name    = $route.current.params.name;
		var address = $route.current.params.address;
		select(name, address);

		$scope.loadingImage = false;

		function select(name, address) {
			// get the restaurant info for the selected restaurant
			// but, if not in database, create the restaurant
			var url = uriSite + uriRoute + "select";
			var selected = {"name": name, "address": address};
			$http({method: "GET", url: url, params: selected})
				.success(function(data) {
					$scope.loading      = false;
					$scope.name         = data.name;
					$scope.address      = data.address;
					$scope.addressFull  = data.address_full;
					$scope.menus        = data.menus;
					$scope.menuOrigin   = data.menu_origin;
				});
		}

		$scope.imageUpdate = function(menuIndex, sectionIndex, subsectionIndex, itemIndex) {
			$scope.loadingImage = true;
			$scope.loadingIndex = itemIndex;
			var url = uriSite + uriRoute + "menuitem" +
			"?menu=" + menuIndex +
			"&section=" + sectionIndex +
			"&subsection=" + subsectionIndex +
			"&item=" + itemIndex +
			"&restaurant=" + $scope.name;
			$http.get(url)
				.success(function(data) {
					$scope.menus[menuIndex].sections[sectionIndex].subsections[subsectionIndex].items[itemIndex] = data;
					$scope.loadingImage = false;
				});
		}
	}]);

	// app.controller('restaurantController', ['$http', function($http, config) {
	app.controller('restaurantController', ['$http', function($http) {

		// TODO: Figure out how to handle the environment in Angular.
		// var uri = process.env.NODE_ENV == "production" ? "https://www.picto-menu.com/api/restaurants/" : "http://localhost:3000/api/restaurants/";
			// console.log(GOOGLE_OAUTH_CLIENT_ID);
		var uriRoute = "api/restaurants/";
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
			var url = uriSite + uriRoute + "search?name=" + restaurant.searchName + "&location=" + restaurant.searchLocation;
			console.log(url);
			$http.get(url)
				.success(function(data) {
					restaurant.results = data;
				});
			restaurant.searchName = "";
			restaurant.searchLocation = "";
		}

		restaurant.select = function(selectedRestaurant) {
			var url = uriSite + uriRoute + "select";
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
			var url = uriSite + uriRoute + "menuitem?restaurant=" + restaurant.searchName + "&menuitem=kalua+pork";
			console.log(url);
			$http.get(url)
				.success(function(data) {
					console.log("yo")
				});
			restaurant.searchName = "";
			restaurant.searchLocation = "";
		}

		restaurant.imageUpdate = function(menu, section, subsection, item) {
			// indexes
			var url = uriSite + uriRoute + "menuitem" +
			"?menu=" + menu +
			"&section=" + section +
			"&subsection=" + subsection +
			"&item=" + item +
			"&restaurant=" + restaurant.name;
			$http.get(url)
				.success(function(data) {
					restaurant.menus[menu].sections[section].subsections[subsection].items[item] = data;
				});
		}

		restaurant.noImageMessages = [
			"Sorry, there are no images for this menu item!",
			"There are no images for this menu item!\n If you buy me please pay it forward and take a picture of your meal and post it here.",
			"Sorry, there are no images available for this item. Take a picture change that!"
		];

		restaurant.random = Math.floor(Math.random()*restaurant.noImageMessages.length);
	}]);

	app.controller('userController', ['$http', '$scope', function($http, $scope) {
		var user = this;
		var uriRoute = "api/users/";
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
			var url = uriSite + uriRoute + "login";
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
