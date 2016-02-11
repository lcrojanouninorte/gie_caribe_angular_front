(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .directive('inputScala', inputScala);

    /** @ngInject */
    function inputScala() {
        var directive = {
            restrict: 'A',
            templateUrl: "app/components/inputScala/inputScala.html",
            scope: {
                items:"=",
                selectedItem: "="
            },
            controller: inputScalaController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }


    /** @ngInject */
    function inputScalaController($modal, $scope) {
        var vm = this;

        if(typeof vm.selectedItem != 'undefined'){
             vm.radioModel = vm.selectedItem;
        }else{
             vm.radioModel = '1';
        }
       
 
    }

 



})();
