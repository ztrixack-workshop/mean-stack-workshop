'use strict';

var mainAppModuleName = 'Main';

// angular.module(moduleName, [dependency1, dependency2, ...]);
var mainAppModule = angular.module(mainAppModuleName, ['ui.router', 'ngMessages', 'core', 'users']);

angular.element(document).ready(function() {
	angular.bootstrap(document.querySelector('#mainApp'), [mainAppModuleName], {
		// use inline array annotation only!
		strictDi: true
	});
});

// inline array annotation:
// 		( 'controllerName', ['$scope', '$http', function($scope, $http) {} ] )
// implicit annotation: (minify/obfuscate problems, use ng-annotate to solve this!)
// 		( 'controllerName', function($scope, $http) {} )
// inject property annotation: Local variable, like as implicit (same problem)
// mainAppModule.controller('NameController', ['$scope', function($scope) {
// 	$scope.yourName = 'No Name';
// }]);

// filter(filtername, function
// mainAppModule.filter('sayhello', function() {
// 	return function (name) {
// 		return 'Hello, ' + name;
// 	};
// });