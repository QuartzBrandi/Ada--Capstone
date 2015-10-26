(function() {
	var app = angular.module('visualMenuControllers', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap'])

	var uriSite = "http://localhost:3000/"

	app.controller('searchController', ['$scope', '$http', function($scope, $http) {
		$scope.searchName = "";
		$scope.searchLocation = "";
		$scope.results = [];
		$scope.noResults = false;

		var uriRoute = "api/restaurants/";

		$scope.search = function() {
			$scope.results = [];
			var url = uriSite + uriRoute + "search?name=" + $scope.searchName + "&location=" + $scope.searchLocation;
			console.log(url);
			$http.get(url)
				.success(function(data) {
					console.log("success");
					$scope.results = data;
					if (data.length == 0) {
						$scope.noResults = true;
					}
					// $scope.searchName = "";
					// $scope.searchLocation = "";
				});
		};
	}]);

	app.controller('theRestaurantController', ['$http', '$scope', '$route', function($http, $scope, $route) {
		$scope.loading      = false;
		$scope.loadingImage = false;
		var uriRoute = "api/restaurants/";
		var name     = $route.current.params.name;
		var address  = $route.current.params.address;
		select(name, address);

		function select(name, address) {
			// get the restaurant info for the selected restaurant
			// but, if not in database, create the restaurant
			var url = uriSite + uriRoute + "select";
			var selected = {"name": name, "address": address};
			$http({method: "GET", url: url, params: selected})
				.success(function(data) {
					// $scope.loading      = false;
					$scope.name         = data.name;
					$scope.address      = data.address;
					$scope.addressFull  = data.address_full;
					$scope.menus        = data.menus;
					$scope.menuOrigin   = data.menu_origin;
					$scope.restaurantID = data._id;
					console.log(data);
				});
		};

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
		};
	}]);

	app.controller('menuIndexController', function() {
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

	app.controller('carouselController', function ($scope) {

		$scope.carouselMenus = function(menus) {
			console.log("Test");
		}

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

	app.controller('noCarouselController', function ($scope) {
		var noImageMessages = [
			"Sorry, there are no images for this menu item!",
			"There are no images for this menu item!\n If you buy me please pay it forward and take a picture of your meal and post it here.",
			"Sorry, there are no images available for this item. Take a picture change that!"
		];

		var randomMessageIndex = Math.floor( Math.random() * noImageMessages.length );

		$scope.noImageMessage = noImageMessages[randomMessageIndex];
	});

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
					console.log("success");
					restaurant.results = data;
				});
			restaurant.searchName = "";
			restaurant.searchLocation = "";
		}
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
	}]);
})();
