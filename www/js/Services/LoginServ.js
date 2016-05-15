var services = angular.module('servicesLogin', [])

  .factory('loginServ', function($http, store, $state, $q) {

    var login = {};
    var api = store.get('api');

      /**
       *
       * Récupère les données de connexion
       * @param data
       *
       */
    login.connect = function(data){
      $http({
        url: api+'/api/api-token-auth/',
        method: 'POST',
        data: data
      }).then(function(response) {
        store.set('jwt', response.data);
        $state.go('app.profile');
      }, function(error) {
        login.message = 'Le pseudo ou le mot passe est invalide';
        console.log(error);
      });
    };

    /**
     *
     * @param id
     * @returns {Promise}
       */
    login.agent = function(id){
      var jwt = store.get('jwt');
      var agent = $q.defer();
      $http({
        url: api+'/api/api-agt/'+id+'/',
        method: 'GET',
        headers: {'Authorization': 'JWT ' + jwt.token}
      }).then(function(response) {
        agent.resolve(response);
      }, function(error) {
        console.log(error);
      });
      return agent.promise;
    };

    return login;
  });
