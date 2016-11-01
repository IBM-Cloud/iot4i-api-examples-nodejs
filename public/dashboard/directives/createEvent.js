/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

function createEventDirective() {
    return {
        restrict: 'E', // C: class, E: element, M: comments, A: attributes
        replace: true, // replaces original content with template
        templateUrl: "./directives/createEvent.html",
        controller: createEventController
    };
}

function createEventController($scope, $http) {
	$scope.createEvent = function() {
		$scope.eventmessage = "Sending request ...";
		
		var data={username: $scope.username};
		 $http.post("/data/hazard", data)
		    .then(function(response) {
		        $scope.eventmessage = "Succesfully simulated a water leak hazard occurring for " + response.data;
		        $scope.step = $scope.step + 1;
		    }, function(error) {
		    	$scope.eventmessage = "Error: " + error.message;
		    });    
	}
}


// module
var app = angular.module('iot4iApiExamples');

// directives
app.directive('createEvent', [createEventDirective]);
