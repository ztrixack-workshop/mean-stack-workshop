'use strict';

// angular.module(moduleName, [dependency1, dependency2, ...]);
var mainAppModule = angular.module('app', []);

mainAppModule.controller('NameController', ['$scope', function($scope) {
	$scope.yourName = 'No Name';
}]);

// filter(filtername, function
mainAppModule.filter('sayhello', function() {
	return function (name) {
		return 'Hello, ' + name;
	};
});