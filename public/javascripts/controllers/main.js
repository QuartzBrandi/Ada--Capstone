(function() {
	// if (process.env.NODE_ENV != "production") {
	//   var env = require('node-env-file');
	//   env('./.env');
	// }

	var app = angular.module('visualMenuControllers', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'ngFileUpload']);

	// TODO: Figure out environment variables for Angular!!
	// CURRENTLY: I have to uncomment when I deploy.
	// var uriSite = process.env.NODE_ENV == "production" ? "http://ada-capstone-production.elasticbeanstalk.com/" : "http://localhost:3000/"
	// var uriSite = "http://ada-capstone-production.elasticbeanstalk.com/";
	var uriSite = "http://www.picto-menu.com/";
	// var uriSite = "http://localhost:3000/";

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
					console.log($scope.results.length);
					// $scope.searchName = "";
					// $scope.searchLocation = "";
				});
		};
	}]);

	// app.controller('theRestaurantController', ['$http', '$scope', '$route', function($http, $scope, $route) {
	app.controller('theRestaurantController', ['$scope', 'Upload', '$timeout', '$http', '$route', function($scope, Upload, $timeout, $http, $route) {
		$scope.loading      = false;
		$scope.loadingImage = false;
		var uriRoute = "api/restaurants/";
		var name     = $route.current.params.name;
		var address  = $route.current.params.address;
		select(name, address);

		$scope.notLoggedInAlert = function() {
			alert('Please signin to upload a photo.')
		}

		$scope.noUsername = function() {
			alert("Please add a username in the options to uplaod a photo.")
		}

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




		// $scope.showUpload = false;
		// $scope.filePhoto = {};
		//
		// $scope.showAddPhotos = function() {
		// 	console.log("HIELL?")
		// 	$scope.showUpload = true;
		// 	// $scope.$digest;
		// };
		//
		// $scope.addPhoto = function() {
		// 	console.log("GOT HERE");
		// 	console.log($scope.filePhoto);
		// };
		// $scope.username = "NOMAN";
		$scope.picFile = null;

		// var uriRoute = "api/restaurants/";

		// $scope.uploadPic = function (file) {
    //     Upload.upload({
    //         url: '/uploads',
    //         data: {file: file, 'username': $scope.username}
    //     }).then(function (resp) {
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };
								//
								// TODO: Show error if trying to upload image that isn't jpg or png
		$scope.uploadPic = function (file, restaurantName, menuIndex, sectionIndex, subsectionIndex, itemIndex, user) {
			console.log("GOT HERE 1")
			console.log("file", file)
			if (file.type == 'image/jpeg' || file.type == 'image/png') {
				console.log("GOT HERE 2")

				file.upload = Upload.upload({
						url: '/api/photo',
						method: 'POST',
						// fields: {
						// 		username: $scope.username
						// },
						file: file
						// fileFormDataName: 'photo'
				});

				console.log("GOT HERE 2.5")

				file.upload.then(function (response) {
					console.log("GOT HERE 3")
						console.log("Postcontroller: upload then ");
						$timeout(function () {
								file.result = response.data;
						});
				}, function (response) {
						if (response.status > 0)
								$scope.errorMsg = response.status + ': ' + response.data;
				});

				file.upload.progress(function (evt) {
					console.log("GOT HERE 3.5")
					// console.log("ping?")
						// Math.min is to fix IE which reports 200% sometimes
						file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
						console.log("PostController: upload progress " + file.progress);
				});

				file.upload.success(function (data, status, headers, config) {
					console.log("GOT HERE 6")
					console.log("DONETOTALLY")
					console.log("DDDATA", data.key)
					console.log("DDDATA", data.filename)
					console.log("user", $scope.username)
						// file is uploaded successfully
						console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
					associateImage(data, restaurantName, menuIndex, sectionIndex, subsectionIndex, itemIndex, user);
					$scope.picFile = null;
				});
			}
		}

					// $http(req)
					// data.filename

			var associateImage = function(fileData, restaurantName, menuIndex, sectionIndex, subsectionIndex, itemIndex, username) {
				console.log("GOT HERE 7")
				var theBucket = "https://s3-us-west-2.amazonaws.com/ada-capstone-menu-photos/"

				console.log("DAFILE", fileData)
				// var url = uriSite + uriRoute + "menu/images"
				// "?menu=" + menuIndex +
				// "&section=" + sectionIndex +
				// "&subsection=" + subsectionIndex +
				// "&item=" + itemIndex +
				// "&restaurant=" + restaurantName;
				var req = {
				  method: 'POST',
				  url: uriSite + uriRoute + "menu/images/",
				//  headers: {
				// 	 'Content-Type': undefined
				//  },
				  data: {
					  file: "N/A",
						url: theBucket + fileData.key,
						// url: fileData.filename,
						restaurant: restaurantName,
						menu: menuIndex,
						section: sectionIndex,
						subsection: subsectionIndex,
						item: itemIndex,
						username: username
				  }
				}

				$http(req)
					.success(function(data) {
						console.log("SUCCESSFULLY SAVED")
						$scope.menus[menuIndex].sections[sectionIndex].subsections[subsectionIndex].items[itemIndex] = data;
					});



				// $http.get(url)
				// 	.success(function(data) {
				// 		$scope.menus[menuIndex].sections[sectionIndex].subsections[subsectionIndex].items[itemIndex] = data;
				// 		$scope.loadingImage = false;
				// 	});
			};
	}]);

	app.controller('expandCollapseCtrl', function ($scope) {
    $scope.active = true;
	});

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

	// app.controller('photoUploadController', function() {
	// 	var photoCtrl = this;
	// 	photoCtrl.showUpload = false;
	//
	// 	photoCtrl.showAddPhotos = function() {
	// 		console.log("HIELL?")
	// 		photoCtrl.showUpload = true;
	// 		// $scope.$digest;
	// 	};
	//
	// 	photoCtrl.addPhoto = function() {
	//
	// 	};
	// })

	app.controller('photoUploadController', ['$scope', 'Upload', '$timeout', '$http', function($scope, Upload, $timeout, $http) {

	}])

	app.controller('carouselController', function ($scope) {

		$scope.carouselMenus = function(menus) {
			console.log("Test");
		};

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
			"Sorry, there are no images for this menu item!"
			// "There are no images for this menu item!\n If you buy me please pay it forward and take a picture of your meal and post it here.",
			// "Sorry, there are no images available for this item. Take a picture change that!"
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
	}]);

})();
