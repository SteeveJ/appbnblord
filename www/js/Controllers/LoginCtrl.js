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
    $scope.login = function(){
      var payload = {
        'username':vm.username,
        'password':vm.password
      };
      loginServ.connect(payload);
      var stopInterval;
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

