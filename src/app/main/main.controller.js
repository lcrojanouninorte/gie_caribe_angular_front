(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope, $http, $log) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1440607514482;
    vm.showToastr = showToastr;
    $scope.data = "";

    $scope.prueba =         function () {
             
           
            return $http.get("http://localhost/api/web_server/")
                .then(success)
                .catch(fail);

            function success(response) {
                $log.info("devolviendo :", response);
                 $scope.data = response.data;
            }

            function fail(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
               
            }
        }

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
