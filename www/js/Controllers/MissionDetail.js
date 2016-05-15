angular.module('missionDetail.controllers', [])

  .controller('MissionDetailCtrl', function($q, $http, store, $cordovaCamera,$state, MissionServ, $filter, $timeout, $stateParams) {
    var vm = this;
    var api = store.get('api');
    var jwt = store.get('jwt');
    var mission_promise = MissionServ.mission($stateParams.id);
    var litterie_promise = MissionServ.litterie($stateParams.id);
    var count = [];
    vm.end_mission = false;
    vm.commentaire = false;
    vm.list = [];

    // boolean to display or hide section
    vm.bool_about = true;
    vm.bool_appt = true;
    vm.bool_traveller = true;
    vm.bool_checkin = true;

    // Display and hide section
    vm.about = function () {
      if(vm.bool_about == false){
        vm.bool_about = true;
      }else{
        vm.bool_about = false;
      }
    };

    vm.appartment = function () {
      if(vm.bool_appt == false){
        vm.bool_appt = true;
      }else{
        vm.bool_appt = false;
      }
    };

    vm.traveller = function () {
      if(vm.bool_traveller == false){
        vm.bool_traveller = true;
      }else{
        vm.bool_traveller = false;
      }
    };

    vm.checkin = function () {
      if(vm.bool_checkin == false){
        vm.bool_checkin = true;
      }else{
        vm.bool_checkin = false;
      }
    };

    // Gets the mission promised by "MissionServ.mission"
    mission_promise.then(function(response){
      vm.mission = response.data;
      vm.appt = vm.mission.mission_reservation.appartement;
      vm.resa = vm.mission.mission_reservation;
      console.log("reservation",vm.resa);
      console.log("appatment",vm.appt);
    });

    // TODO : bedding is temporary
    litterie_promise.then(function(response){
      vm.litterie = response.data;
      vm.pillowcase = (vm.litterie.used_double_coach+vm.litterie.used_double_bed)*2+vm.litterie.used_simple_coach+vm.litterie.used_simple_bed;
    });

    /**
      * add item(s) in an array of missing
      * @param data
      */
    vm.add = function(data){
      vm.list.push(data);
      console.log(vm.list)
    };

    /**
     * remove item(s) in an array of missing
     * @param index
     */
    vm.remove = function(index){
      vm.list.splice(index, 1);
    };

    // Move Http Request to missionServ
    var hide_mission = function(id){
      var finished = $q.defer();
      $http({
        url: api + '/api/api-end-mission/'+id+'/',
        method: 'GET',
        headers: {'Authorization': 'JWT ' + jwt.token}
      }).then(function (data) {
        console.log(data.data);
        finished.resolve(data);
      });
      return finished.promise;
    };

    /**
       * Hidden mission on the dashboard of user
       * @param response
       */
    vm.endMission = function(response){
      if(response == 'finished'){
        if(vm.end_mission == true){
          vm.end_mission = false;
        }else{
          vm.end_mission = true;
        }
      }else if (response == 'not_finished'){
        // TODO : Create a action if the traveller is not arrived
      }
    };

    /**
     * uncheck the check box of page "Traveller is not arrived",
     * if the choice 1,2 or 3 is selected the others choice is unchecked
     * except the choice 4.
     * @param response
       */
    var uncheck = function(response){
      switch (response){
        case 1:
          vm.late = false;
          vm.resaCancelled = false;
          if(count.indexOf(2) !== -1) {
            var index = count.indexOf(2);
            count.splice(index, 1);
          }else if(count.indexOf(3) !== -1) {
            var index = count.indexOf(3);
            count.splice(index, 1);
          }
          break;
        case 2:
          vm.callIsNotPossible = false;
          vm.resaCancelled = false;
          if(count.indexOf(1) !== -1) {
            var index = count.indexOf(1);
            count.splice(index, 1);
          }else if(count.indexOf(3) !== -1) {
            var index = count.indexOf(3);
            count.splice(index, 1);
          }
          break;
        case 3:
          vm.callIsNotPossible = false;
          vm.late = false;
          if(count.indexOf(2) !== -1) {
            var index = count.indexOf(2);
            count.splice(index, 1);
          }else if(count.indexOf(1) !== -1) {
            var index = count.indexOf(1);
            count.splice(index, 1);
          }
          break;
      }
    };

      /**
       * Add or remove items to array Count
       * Count is a array to store the value of arrived
       * @param response
       */
    var addOrRemoveCount = function(response){
      if(count.indexOf(response) !== -1) {
        var index = count.indexOf(response);
        if(response == 4){
          vm.commentaire = false;
        }
        vm.end_mission = false;
        count.splice(index, 1);
      }else{
        if(response == 4){
          vm.commentaire = true;
        }
        vm.end_mission = true;
        count.push(response);
        uncheck(response);
      }
    };

      /**
       * 1 : It's impossible to call the traveller(s)
       * 2 : Delay exceeds 2 hours
       * 3 : Rerservation cancelled
       * 4 : Others (with comment)
       * @param response
       */
    vm.arrived = function(response) {
      switch (response){
        case 1:
          addOrRemoveCount(response);
          break;
        case 2:
          addOrRemoveCount(response);
          break;
        case 3:
          addOrRemoveCount(response);
          break;
        case 4:
          addOrRemoveCount(response);
          break;
      }
    };

    vm.delivery = function(){
      //TODO: Create a function push true or false to the api
      //TODO: demander à léo plus de détails sur le retour des livreurs
      alert('a faire');
    };

    vm.bedding = function(){
      // TODO: Create a function to return the missing bedding
    };

    /**
     * status_code
     * 1 : checkout
     * 2,3 : check in
     * @param id
     * @param status_code
     */
    vm.finish = function(id, status_code){
      if(status_code == 1){
        hide_mission(id);
      }else if(status_code == 2){
        var status_mission;
        for (i = 0; i < 2; i++) {
          switch (count[i]){
            case 1:
              status_mission = 'UNKNOW';
              break;
            case 2:
              status_mission = 'LATE';
              break;
            case 3:
              status_mission = 'CANCELLED';
              break;
          }
        }
        payload = {
          'status': status_mission,
          'comment': vm.comment
        };
        console.log(payload);
        $http({
          url: api + '/api/api-change-status/'+id+'/',
          method: 'POST',
          headers: {'Authorization': 'JWT ' + jwt.token},
          data: payload
        }).then(function (data) {
          $state.go('app.profile')
        });
      }else if(status_code == 3){
        payload = {
          'status': 'ARRIVED',
          'evt': vm.event,
          'restaurant': vm.restaurant,
          'comment': vm.comment
        };
        $http({
          url: api + '/api/api-change-status/'+id+'/',
          method: 'POST',
          headers: {'Authorization': 'JWT ' + jwt.token},
          data: payload
        }).then(function (data) {
          $state.go('app.profile')
        });
      }
    };

  });
