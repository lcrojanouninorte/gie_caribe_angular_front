(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('InstrumentsController', InstrumentsController);

     /** @ngInject */
    function InstrumentsController($cookies, $log) {
        var vm = this;
       $log.debug('cookies en instrument', $cookies);


    }
})();
