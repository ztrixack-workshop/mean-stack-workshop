'use strict';

// angular.module(moduleName, [dependency1, dependency2, ...]);
var mainAppModule = angular.module('app', []);

// filter(filtername, function
mainAppModule.filter('sayhello', function() {
	return function (name) {
		return 'Hello, ' + name;
	};
});