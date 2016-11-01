/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

function showResultDirective() {
    return {
        restrict: 'E', // C: class, E: element, M: comments, A: attributes
        replace: true, // replaces original content with template
        templateUrl: "./directives/showResult.html",
        controller: showResultController
    };
}

function showResultController($scope, $http) {
	
}


// module
var app = angular.module('iot4iApiExamples');

// directives
app.directive('showResult', [showResultDirective]);
