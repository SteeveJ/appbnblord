'use strict';

angular.module('login.controllers', [])

  .controller('LoginCtrl', function($scope, $timeout, $http, store, $state, jwtHelper, JWTServ, loginServ, $interval) {

    $timeout(function(){
      JWTServ.check_tokenLogin();
    }, 400);
    var vm = this;


    /**
     *
     * Connexion des utilisateurs
     * @param username
     * @param password
     *
     **/
    $scope.login = function(username, password){
      var payload = {
        'username':username,
        'password':password
      };
      loginServ.connect(payload);
      var stopInterval;
      console.log(store.get('jwt'))
      var message = $interval(function(){
        // on affiche l'erreur
        vm.message = loginServ.message;

        // on Stop les intervals
        if(stopInterval == true){
          $interval.cancel(stop);
          $interval.cancel(message);
        }
        var stop = $interval(function(){
          stopInterval = true;
        }, 101);
      }, 100);
    };


  });

