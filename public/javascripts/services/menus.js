(function() {
  var app = angular.module('visualMenuServices', [])

  app.directive("searchBox", function() {
    return {
      restrict: 'E',
      templateUrl: "pages/search_box.html"
    };
  });

  app.directive("addPhoto", function() {
    return {
      restrict: 'E',
      templateUrl: "pages/upload_photo.html"
      // controller: 'photoUploadController'
    };
  });
})();
