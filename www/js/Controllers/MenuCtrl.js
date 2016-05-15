angular.module('menu.controllers', [])

.controller('MenuCtrl', function($scope, $timeout, $http, store, $state, jwtHelper, JWTServ) {
  var vm = this
  JWTServ.check_token();
  vm.disconnect = function(){
    store.remove('jwt');
    $state.go('login')
  }
  vm.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
});
