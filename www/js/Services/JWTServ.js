var services = angular.module('servicesJWT', [])

.factory('JWTServ', function($http, store, $state, jwtHelper) {
  var api = 'http://192.168.0.23:8000';
  store.set('api', api);
  var jwt = {};

  jwt.check_tokenLogin = function(){
    /**
     * Vérifie si le token de l'utilisateur est valide
     */
    if(store.get('jwt') != null){

      var jwt = store.get('jwt');
      var isExpired = jwtHelper.isTokenExpired(jwt.token);

      /**
       * on vérifie si le token est valide sinon on refresh
       * Si valide on va sur la page profile
       */
      if(isExpired == false){
        var expireDate = jwtHelper.getTokenExpirationDate(jwt.token);
        var datetime = new Date;

        if(datetime.getFullYear() == expireDate.getFullYear()){
          if(datetime.getMonth() == expireDate.getMonth()){
            var diff = expireDate.getDay() - datetime.getDate();

            /**
             * 0 : le jour de l'expiration du token
             */
            if(diff < 3 && diff != 0){
              var token = {
                'token': jwt.token,
              };

              /**
               * On lance la requête Http pour rafraîchir le token
               */
              $http({
                url: api+'/api/api-token-refresh/',
                method: 'POST',
                data: token
              }).then(function(response) {

                store.set('jwt', response.data);
              }, function(error) {
                console.log(error)
              });
            }
          }
        }
        $state.go('app.profile')
      }
    }
  };

  jwt.check_token = function(){
    /**
     * Vérifie si le token de l'utilisateur est valide
     */
    if(store.get('jwt') != null){

      var jwt = store.get('jwt');
      var isExpired = jwtHelper.isTokenExpired(jwt.token);

      /**
       * on vérifie si le token est valide sinon on refresh
       * Si valide on va sur la page profile
       */
      if(isExpired == false){
        var expireDate = jwtHelper.getTokenExpirationDate(jwt.token);
        var datetime = new Date;

        if(datetime.getFullYear() == expireDate.getFullYear()){
          if(datetime.getMonth() == expireDate.getMonth()){
            var diff = expireDate.getDay() - datetime.getDate();

            /**
             * 0 : le jour de l'expiration du token
             */
            if(diff < 3 && diff != 0){
              var token = {
                'token': jwt.token,
              };

              /**
               * On lance la requête Http pour rafraîchir le token
               */
              $http({
                url: api+'/api/api-token-refresh/',
                method: 'POST',
                data: token
              }).then(function(response) {
                store.set('jwt', response.data);
              }, function(error) {
                console.log(error )
              });
            }
          }
        }
      }else{
        $state.go('login')
      }
    }
  };

  return jwt;
});
