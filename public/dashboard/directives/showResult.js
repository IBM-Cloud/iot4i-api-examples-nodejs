/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
