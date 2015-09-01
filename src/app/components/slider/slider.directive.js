(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .directive('sliderDirective', slider);

  /** @ngInject */
  function slider() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/slider/slider.html',
      scope: {
          creationDate: '='
      },
      controller: sliderController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function sliderController(moment) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
