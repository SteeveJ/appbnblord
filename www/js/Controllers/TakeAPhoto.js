angular.module('TakeAPhoto.controllers', [])

  .controller('TakeAPhotoCtrl', function($http, store, $cordovaCamera, $state, MissionServ, $filter, $timeout, $stateParams) {
    var vm = this;

    // variable debugging
    vm.debug = {};


    vm.takePhoto = function () {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 75,
        targetWidth: 320,
        targetHeight: 320,
        destinationType: 0
      });
      function onSuccess(imageData) {
        alert('onSuccess');
        console.log("data:image/jpeg;base64,"+imageData);
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }
    };

    /*var vm = this;
    vm.send_Boolean = false;
    vm.idMission = $stateParams.idMission;
    vm.idImageRef = $stateParams.idImageRef;
    vm.idAppt = $stateParams.idAppt;
    vm.aws = store.get('aws');
    vm.btn_take = "Prendre une photo";
    var img = store.get('img');
    var uriImg = [];
    var uriImg_tmp = angular.fromJson(img.data);
    var i = 0;

    angular.forEach(uriImg_tmp ,function(key){
      uriImg.push(angular.fromJson(key)[0]);
    });

    angular.forEach(uriImg, function(key){
      if(parseInt(key.pk) == parseInt(vm.idImageRef)){
        vm.img = key.fields;
      }
    });

    var key = function(){
      var capital = ['A','B','C','D','E','F',];
      var special = ['#','.','*','@','$',];
      var number = ['1','3','4','5','6','7',];
      var lower = ['a','b','c','d','e','f',];
      var masterKey = "";
      var maxkey = 8;
      for(i=0; i<maxkey; i++){
        var rand = Math.floor((Math.random()*4)+1);
        var lenA;
        var randA;
        switch (rand) {
          case 1:
            lenA = capital.length;
            randA = Math.floor((Math.random()*lenA)+1);
            masterKey += capital[randA-1];
            break;
          case 2:
            lenA = special.length;
            randA = Math.floor((Math.random()*lenA)+1);
            masterKey += special[randA-1];
            break;
          case 3:
            lenA = number.length;
            randA = Math.floor((Math.random()*lenA)+1);
            masterKey += number[randA-1];
            break;
          case 4:
            lenA = lower.length;
            randA = Math.floor((Math.random()*lenA)+1);
            masterKey += lower[randA-1];
            break;
        }
      }
      return masterKey;
    };

    vm.photo = [];

    if(vm.photo.length == 0){
      vm.photoBoolean = false;
    }else{
      vm.photoBoolean = true;
    }

    vm.takePhoto = function () {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        targetWidth: 1024,
        targetHeight: 1024,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        var imgURI = imageData;
        var image = new Object();
        image.id = key();
        image.date = $filter('date')(new Date(), 'dd_MM_yyyy');
        image.uri = imgURI;
        image.mission = vm.idMission;
        image.idAppt = vm.idAppt;
        image.idImageRef = vm.idImageRef;
        vm.send_Boolean = true;
        vm.btn_take = "Changer la photo";
        vm.photo = image;
      }, function (err) {
        // An error occured. Show a message to the user
      });
    };

    vm.send = function(data){
      var dataJSON = angular.toJson(data);
      var api = store.get('api');
      var jwt = store.get('jwt');
      console.log(angular.toJson(vm.photo));
      $http({
          url: api+'/api/api-manageImages/',
          method: 'POST',
          headers: {'Authorization': 'JWT '+jwt.token},
          data: dataJSON
      }).then(function(response) {
        vm.response = response.data;
        if(vm.response==true){
          vm.btn_take = "Prendre une photo";
          vm.send_Boolean = false;
          vm.photo=null;
          $state.go('app.profile');
        }else{
          vm.return = "Erreur le fichier que vous avez uploader est trop lourd"
        }
      }, function(error) {
        // angular.forEach(error, function(key, value){
        //   console.log(key, value);

        // })
      });
    };
      /!**
       * lien vers la home
       *!/
    vm.home = function(){
      $state.go('app.profile');
    }*/

  });
