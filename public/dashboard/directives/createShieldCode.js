/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

function createShieldCodeDirective() {
    return {
        restrict: 'E', // C: class, E: element, M: comments, A: attributes
        replace: true, // replaces original content with template
        templateUrl: "./directives/createShieldCode.html",
        controller: createShieldCodeController
    };
}

function createShieldCodeController($scope, $http) {
	
	$scope.createShieldCode = function() {
		$scope.codemessage = "Sending request ...";
		
		var data={shieldid: $scope.shieldid};
		 $http.post("/data/code", data)
		    .then(function(response) {
		        $scope.codemessage = "Succesfully created code for shield " + response.data;
		        $scope.step = $scope.step + 1;
		    }, function(error) {
		    	$scope.usermessage = "Error: " + error.message;
		    });
	}
}


// module
var app = angular.module('iot4iApiExamples');

// directives
app.directive('createShieldCode', [createShieldCodeDirective]);
