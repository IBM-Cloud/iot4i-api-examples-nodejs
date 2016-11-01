/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

function createUserDirective() {
    return {
        restrict: 'E', // C: class, E: element, M: comments, A: attributes
        replace: true, // replaces original content with template
        templateUrl: "./directives/createUser.html",
        controller: createUserController
    };
}

function createUserController($scope, $http, $log) {
	$scope.log = $log;
	
	$scope.usermessage = "";
	
	$scope.createUser = function() {
		
		$scope.usermessage = "Sending request ...";
		
		 $http.post("/data/user")
		    .then(function(response) {
		        $scope.usermessage = "Succesfully created user " + response.data;
		        $scope.username = response.data;
		        $scope.step = $scope.step + 1;
		    }, function(error) {
		    	$scope.usermessage = "Error: " + error.message;
		    });
	}
}


// module
var app = angular.module('iot4iApiExamples');

// directives
app.directive('createUser', [createUserDirective]);
