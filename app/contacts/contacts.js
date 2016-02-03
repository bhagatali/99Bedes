'use strict';

angular.module('myApp.contacts', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsController'
  });
}])

.controller('ContactsController', ['$scope','$firebaseArray', '$timeout', function($scope,$firebaseArray,$timeout) {
    var ref = new Firebase('https://99bedes.firebaseio.com/contactDB');
    
    $scope.contacts = $firebaseArray(ref);
    $scope.showAddForm = function(){
      $scope.addFormShow = true;        
    };
    
    $scope.hideForm = function(){
      $scope.addFormShow = false;    
    };
    
    $scope.$watch('msg',function(){
        $timeout(function(){
            $scope.msg = false;
        },5000)    
    });
    
    $scope.submitAddForm = function(){
        $scope.contacts.$add({
            name:$scope.name || null,
            email:$scope.email || null,
            company:$scope.company || null,
            phones:[
                {
                    mobile:$scope.mobile_phone || null,
                    work:$scope.work_phone || null,
                    home:$scope.home_phone || null
                }
            ],
            address:[
                {
                    street:$scope.street_address || null,
                    city:$scope.city || null,
                    state:$scope.state || null,
                    zipcode:$scope.zipcode || null
                }
            ]

        }).then(function(ref){
            var id = ref.key();
            console.log('Added record with id: ' + id);
            
            clearFields();
            
            $scope.addFormShow = false;
            $scope.msg = "Contact Added";
        });        
    }
    
    var clearFields = function(){
        $scope.name = "";
        $scope.email = "";
        $scope.company = "";
        $scope.mobile_phone = "";
        $scope.work_phone = "";
        $scope.home_phone = "";
        $scope.street_address = "";
        $scope.city = "";
        $scope.state = "";
        $scope.zipcode = "";
    };
}]);