(function() {
	var app = angular.module('visualMenuConfig', ['ngRoute'])

	// TODO: Get rid of the little # in the URL...?
	app.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl: 'pages/home.html',
				controller: 'searchController'
			})

			.when('/home', {
				redirectTo: '/'
			})

      // TODO: Give an error or redirect if not in database.
			// TODO: What if a name or address has a slash in it?
      // route for a specific restaurant page
			.when('/menu/:name/:address', {
				templateUrl: 'pages/menu.html',
				controller: 'theRestaurantController'
			})

      // route for the user profile page
			.when('/profile', {
				templateUrl: 'pages/profile.html'
			})

			// route for the visual menu about page
			.when('/about', {
				templateUrl: 'pages/about.html'
			})

			// route for the visual menu contact page
			.when('/contact', {
				templateUrl: 'pages/contact.html'
			})

      // if doesn't match the above, redirect
			.otherwise({
				redirectTo: '/'
			});
	});
})();
