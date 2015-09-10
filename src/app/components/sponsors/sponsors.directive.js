(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .directive('sponsors', sponsors);

  /** @ngInject */
  function sponsors() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sponsors/sponsors.html',
      scope: {  
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      var vm = this;
   
    }
  }

})();
