(function() {
	// var app = angular.module('visualMenu', ['visualMenu.config'])
	var app = angular.module('visualMenu', [ ])

	app.controller('restaurantController', ['$http', function($http) {
		// TODO: Figure out how to handle the environment in Angular.
		// var uri = process.env.NODE_ENV == "production" ? "https://www.picto-menu.com/api/restaurants/" : "http://localhost:3000/api/restaurants/";
			// console.log(GOOGLE_OAUTH_CLIENT_ID);
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

	app.controller('GoogleCtrl', function() {
		var thing = this;
		// thing.stuff = "bow";
		// console.log(thing.stuff);

	  function onSignIn(googleUser) {
	    var profile = googleUser.getBasicProfile();
	    console.log('ID: ' + profile.getId());
	    console.log('Name: ' + profile.getName());
	    console.log('Image URL: ' + profile.getImageUrl());
	    console.log('Email: ' + profile.getEmail());

			var id_token = googleUser.getAuthResponse().id_token;
			console.log("ID Token: " + id_token);
			thing.stuff = "blahdaboo";
			console.log("inside", thing.stuff);
		}
		// console.log('WHYYY')
		// console.log(thing.stuff);


  	window.onSignIn = onSignIn;
	});

	app.controller('userController', ['$http', function($http) {
		var user = this;
		console.log("yup");

		user.test = function() {
			console.log("hi!!");
		}

		user.onSignIn = function() {
			console.log("hi")
			var id_token = googleUser.getAuthResponse().id_token;

			     // Useful data for your client-side scripts:
			     var profile = googleUser.getBasicProfile();
			     console.log("ID: " + profile.getId()); // Don't send this directly to your server!
			     console.log("Name: " + profile.getName());
			     console.log("Image URL: " + profile.getImageUrl());
			     console.log("Email: " + profile.getEmail());

			     // The ID token you need to pass to your backend:
			     var id_token = googleUser.getAuthResponse().id_token;
			     console.log("ID Token: " + id_token);
		}
		// <script>
		//   function onSignIn(googleUser) {
		//     var id_token = googleUser.getAuthResponse().id_token;
		//
		//     //  // Useful data for your client-side scripts:
		//     //  var profile = googleUser.getBasicProfile();
		//     //  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
		//     //  console.log("Name: " + profile.getName());
		//     //  console.log("Image URL: " + profile.getImageUrl());
		//     //  console.log("Email: " + profile.getEmail());
		//      //
		//     //  // The ID token you need to pass to your backend:
		//     //  var id_token = googleUser.getAuthResponse().id_token;
		//     //  console.log("ID Token: " + id_token);
		//      //
		//     //  var xhr = new XMLHttpRequest();
		//     //   xhr.open('POST', 'http://localhost:3000/api/users/login');
		//     //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		//     //   console.log("here");
		//     //   xhr.onload = function() {
		//     //     console.log("not");
		//     //     console.log('Signed in as: ' + xhr.responseText);
		//     //   };
		//     //   console.log("ya");
		//     //   xhr.send('idtoken=' + id_token);
		//    };
		//  </script>
	}]);
})();
