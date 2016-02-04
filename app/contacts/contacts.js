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
      clearFields();    
      $scope.addFormShowFlag = true;        
    };

    $scope.showEditForm = function(contacts){
      $scope.editFormShowFlag = true; 
      
      clearFields();

      $scope.id = contacts.$id;  
      $scope.name = contacts.name;
      $scope.company = contacts.company;
      $scope.email = contacts.email;
      $scope.work_phone = contacts.phones[0].work;
      $scope.home_phone = contacts.phones[0].home;
      $scope.mobile_phone = contacts.phones[0].mobile;
      $scope.city = contacts.address[0].city;
      $scope.state = contacts.address[0].state;
      $scope.country = contacts.address[0].country;    
    };
    
    $scope.hideForm = function(){
      $scope.addFormShowFlag = false; 
      $scope.showContactFlag = false; 
      $scope.editFormShowFlag = false; 
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
                    city:$scope.city || null,
                    state:$scope.state || null,
                    country:$scope.country || null
                }
            ]

        }).then(function(ref){
            var id = ref.key();
            console.log('Added record with id: ' + id);
            
            clearFields();
            
            $scope.addFormShowFlag = false;
            $scope.msg = "Contact Added";
        });        
    };
    
    $scope.submitEditForm = function(){
        
        var record = $scope.contacts.$getRecord($scope.id);
        record.name = $scope.name;
        record.company = $scope.company;
        record.email = $scope.email;
        record.phones[0].work = $scope.work_phone;
        record.phones[0].home = $scope.home_phone;
        record.phones[0].mobile = $scope.mobile_phone;
        record.address[0].city = $scope.city;
        record.address[0].state = $scope.state;
        record.address[0].country = $scope.country; 
        
        $scope.contacts.$save(record).then(function(ref){
            console.log(ref.key + ' is updated..');
            clearFields();
            $scope.editFormShowFlag = false;
            $scope.msg = "Contact Updated";
        });
    };
    
    $scope.showContacts = function(contacts){
        
        clearFields();
        
        $scope.name = contacts.name;
        $scope.company = contacts.company;
        $scope.email = contacts.email;
        $scope.work_phone = contacts.phones[0].work;
        $scope.home_phone = contacts.phones[0].home;
        $scope.mobile_phone = contacts.phones[0].mobile;
        $scope.city = contacts.address[0].city;
        $scope.state = contacts.address[0].state;
        $scope.country = contacts.address[0].country;
        
        $scope.showContactFlag = true;
    };
    
    var clearFields = function(){
        $scope.name = "";
        $scope.email = "";
        $scope.company = "";
        $scope.mobile_phone = "";
        $scope.work_phone = "";
        $scope.home_phone = "";
        $scope.city = "";
        $scope.state = "";
        $scope.country = "";
    };
}]);