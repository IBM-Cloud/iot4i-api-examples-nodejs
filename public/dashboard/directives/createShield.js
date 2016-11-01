/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

function createShieldDirective() {
    return {
        restrict: 'E', // C: class, E: element, M: comments, A: attributes
        replace: true, // replaces original content with template
        templateUrl: "./directives/createShield.html",
        controller: createShieldController
    };
}

function createShieldController($scope, $http) {
	
	$scope.createShield = function() {
		$scope.shieldmessage = " sending request ...";
				
		$http.post("/data/shield")
		    .then(function(response) {
		        $scope.shieldmessage = "Succesfully created shield " + response.data;
		        $scope.shieldid= response.data;
		        $scope.step = $scope.step + 1;
		    }, function(error) {
		    	$scope.shieldmessage = "Error: " + error.message;
		    });
	}
}


// module
var app = angular.module('iot4iApiExamples');

// directives
app.directive('createShield', [createShieldDirective]);
