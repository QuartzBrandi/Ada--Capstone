(function() {

	var app = angular.module('visualMenuControllerUsers', []);

  // TODO: Figure out environment variables for Angular!!
	// CURRENTLY: I have to uncomment when I deploy.
	// var uriSite = process.env.NODE_ENV == "production" ? "http://ada-capstone-production.elasticbeanstalk.com/" : "http://localhost:3000/"
	// var uriSite = "http://ada-capstone-production.elasticbeanstalk.com/";
	// var uriSite = "http://www.picto-menu.com/";
	var uriSite = "http://localhost:3000/";

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
			// var email = googleUser.getBasicProfile().getEmail();
			var id_token = googleUser.getAuthResponse().id_token;
			// console.log(id_token);
      console.log("LOGGING IN");
			console.log(typeof(id_token));
			user.name = name;
			var url = uriSite + uriRoute + "login";
			$http({method: "GET", url: url, params: {
				id_token: id_token
				// name: name
				// email: email
			}})
				.success(function(data) {
					user.information = data;
					user.logged_in = true;
          console.log("LOGGED IN.")
				});

			$scope.$digest(); // refreshes two-way-biding? (without this there was a delay to update)
			// OR USE:
			// $scope.$apply();
			// TODO: Figure out what the difference is between digest & apply.
		}
		window.onSignIn = onSignIn;
	}]);

  app.controller('', ['$http', function($http) {

  }]);
})();
