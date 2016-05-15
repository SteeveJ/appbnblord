var services = angular.module('servicesMissions', [])

  .factory('MissionServ', function($http, store, $timeout, $q) {
    var data = {};
    var api = store.get('api');
    var jwt = store.get('jwt');

    /**
     * Retourne les missions qui on été assigné à l'agent
     * @returns {Promise}
     */
    data.my_mission = function(){
      var my_mission = $q.defer();
      $http({
        url: api + '/api/api-my-missions/',
        method: 'GET',
        headers: {'Authorization': 'JWT ' + jwt.token}
      }).then(function (data) {
        my_mission.resolve(data);
      });
      return my_mission.promise;
    };

    data.mission = function(id_mission){
      var my_mission = $q.defer();
      $http({
        url: api + '/api/api-missions/'+id_mission+'/',
        method: 'GET',
        headers: {'Authorization': 'JWT ' + jwt.token}
      }).then(function (data) {
        my_mission.resolve(data);
      });
      return my_mission.promise;
    };

    data.litterie = function(id){
      var litterie = $q.defer();
      $http({
        url: api + '/api/api-litterie/'+id+'/',
        method: 'GET',
        headers: {'Authorization': 'JWT ' + jwt.token}
      }).then(function (data) {
        litterie.resolve(data);
      });
      return litterie.promise;
    };

    return data;
  });
