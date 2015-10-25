// angular.module('config', [])
//   .constant("greeting", "https://www.picto-menu.com/api/restaurants/");
// angular.module('myApp.config', [])
//     .constant('APP_NAME','My Angular App!')
//     .constant('APP_VERSION','0.3');

(function() {
	// var app = angular.module('visualMenuControllers', ['config'])
	// var app = angular.module('visualMenuControllers', [ ])
	var app = angular.module('visualMenuConfig', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap'])

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
})();
