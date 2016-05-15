angular.module('profile.controllers', [])

.controller('ProfileCtrl', function($http, store, $state, MissionServ, $timeout, jwtHelper, $filter, $interval, $cordovaNetwork, loginServ) {
  var vm = this;
  var jwt = store.get('jwt');
  var user = jwtHelper.decodeToken(jwt.token);
  var user_promise = loginServ.agent(user.user_id);
  
  /**
   * On récupère les données des utilisateurs
   */
  user_promise.then(function(response){
    store.set('user', response.data);
    vm.user = store.get('user');
  });

  /**
   * convertie les date au format Fr
   * @param date
   * @returns {boolean}
     */
  vm.dateNow = function(date){
    var dateNow = new Date();
    var dateNowF = $filter('date')(dateNow, "dd/MM/yyyy");
    var dateF = $filter('date')(date, "dd/MM/yyyy");
    if(dateNowF == dateF){
      return true;
    }else{
      return false;
    }
  };

  /*
   * Dans missionServ, il y a une fonction qui récupère les missions de l'agent
   * Puis on stock les missions dans une le store.
   * */
  var mission = function(){
    var mymission = MissionServ.my_mission();
    mymission.then(function(response){
      vm.mymission = response.data;
      store.set('noLoadMission', response.data);
    });
  };

  /*
   * On vérifie le type de connexion.
   * Si la connexion est égale à wifi, 3g, 4g on lance la
   * fonction mission.
   * Sinon on verifie que la variable noloadMission n'est pas null.
   *
   * */
  if($cordovaNetwork.getNetwork() == 'WiFi connection' ||
      $cordovaNetwork.getNetwork() == 'Cell 3G connection' ||
      $cordovaNetwork.getNetwork() == 'Cell 4G connection'){
    mission();
  }else{
    if(store.get('noloadMission')){
      vm.mymission = store.get('noloadMission');
    }else{
      vm.error = 'No data loads'
    }
  }
});
