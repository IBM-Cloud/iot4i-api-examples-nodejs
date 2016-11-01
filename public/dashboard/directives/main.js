/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

function mainDirective() {
    return {
        restrict: 'E', // C: class, E: element, M: comments, A: attributes
        replace: true, // replaces original content with template
        templateUrl: "./directives/main.html",
        controller: mainController
    };
}

function mainController($scope, $http, $window) {
	$scope.step = 1;
	$scope.username = '<user>';
	$scope.shieldid = '<shield>';
	
	$scope.dashboard = "-";
	
	$http.get("/info")
    .then(function(response) {
    	$scope.dashboard = response.data.api + "/dist";
    }, function(error) {
    });

}

// module
var app = angular.module('iot4iApiExamples', []);

// directives
app.directive('examplesMain', [mainDirective]);

