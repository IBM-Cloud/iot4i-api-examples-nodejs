/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

function createShieldAssociationDirective() {
    return {
        restrict: 'E', // C: class, E: element, M: comments, A: attributes
        replace: true, // replaces original content with template
        templateUrl: "./directives/createShieldAssociation.html",
        controller: createShieldAssociationController
    };
}

function createShieldAssociationController($scope, $http) {
	$scope.createShieldAssociation = function() {
		$scope.associationmessage = "Sending request ...";
		
		var data={username:  $scope.username, shieldid: $scope.shieldid};
		 $http.post("/data/association", data)
		    .then(function(response) {
		        $scope.associationmessage = "Succesfully created shield association " + response.data.username + ":" + response.data.shieldid;
		        $scope.step = $scope.step + 1;
		    }, function(error) {
		    	$scope.associationmessage = "Error: " + error.message;
		    });  
	}
}


// module
var app = angular.module('iot4iApiExamples');

// directives
app.directive('createShieldAssociation', [createShieldAssociationDirective]);
