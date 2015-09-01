(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $anchorScroll) {
$anchorScroll.yOffset = 50; 
    $log.debug('runBlock end');
  }

})();
