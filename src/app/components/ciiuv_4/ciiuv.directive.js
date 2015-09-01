(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .directive('ciiuvModalBtn', ciiuvModal)
        .controller('ModalInstanceCtrl', ModalController);



    /** @ngInject */


    function ciiuvModal() {
        var directive = {
            restrict: 'E',
            template: "<button type='button' ng-click='ciiuvModal.open()'>Buscar</button>",
            scope: false,
            controller: ciiuvModalController,
            controllerAs: 'ciiuvModal',
            bindToController: true
        };

        return directive;
    }


    /** @ngInject */
    function ciiuvModalController($modal, $scope) {
        var vm = this;
        vm.open = function(size) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'app/components/ciiuv_4/ciiuv.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                size: 'lg',

            });

            modalInstance.result.then(function(selectedItem) {
                $scope.answers.s3.p1 = selectedItem;
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

        }


    }

    function ModalController(ciiuv_revs, $scope, $modalInstance) {
        var vm = this;
        vm.revs = [];
        vm.revs = ciiuv_revs.getCiiuv();
        vm.selected = "";

        $scope.ok = function() {
           // alert($scope);
            $modalInstance.close(vm.selected);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }



})();
