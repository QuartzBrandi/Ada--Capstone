(function() {
  angular.module('visualMenu', ['visualMenuControllers', 'visualMenuControllerUsers', 'visualMenuConfig', 'visualMenuServices', 'angular-loading-bar'])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
			cfpLoadingBarProvider.spinnerTemplate = '<div class="spinny-thing"><span class="fa fa-spinner fa-pulse fa-3x"></span></div>';
		}]);
})();
