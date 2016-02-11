(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .directive('saveBtn', saveBtn)
        .directive('navigationBtns', navigationBtns)
        .directive('watchChanges', watchChanges)
        .directive('orderButton', orderButton);

    /** @ngInject */
    function saveBtn() {
        var directive = {
            restrict: 'A',
            templateUrl: "app/InstrumentoICAI/partials/btn-save.tpl.html",
            controller: saveBtnController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                type:"=",
                answers:"=",
                userid:"="
            }

        };

        return directive;


    }
    /** @ngInject */

     function saveBtnController($timeout, instrument) {
        var vm = this;
         vm.saved = false;
                vm.text = "Guardar";
                vm.class = "glyphicon glyphicon-floppy-disk";
                vm.save = function() {
                    if (!vm.saved) {
                        //correr funcion para guardar
                        if (instrument.setAnswers(vm.type,vm.userid, vm.answers)) {
                            vm.class = "glyphicon glyphicon-floppy-saved ";
                            vm.text = "Guardado!";
                            vm.saved = true;
                        } else {
                            vm.class = "glyphicon glyphicon-floppy-disk";
                            vm.text = "Error al Guardar, intente nuevamente";
                            vm.saved = false;
                        };
                        $timeout(function() {
                            vm.text = "Guardar";
                            vm.class = "glyphicon glyphicon-floppy-disk";
                            vm.saved = false;
                        }, 2000);

                    }
                }
                vm.unsave = function() {

                }

     }
   /** @ngInject */

    function navigationBtns() {
        var directive = {
            restrict: 'E',
            templateUrl: "app/InstrumenntoICAI/partials/next_before.html",
            scope: {
                next: "=",
                before: "="
            },
            link: function(scope, elem, attrs) {




            },

        };

        return directive;


    }
   /** @ngInject */

    function watchChanges() {
        var directive = {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                scope.$watch(attrs.ngModel, function(newValue) {
                    console.log("Changed to " + newValue);
                });

            },

        };

        return directive;

    }
   /** @ngInject */

    function orderButton() {
        var directive = {
            restrict: 'E',
            templateUrl: "app/instrumenntoICAI/partials/orderButton.html",
            scope: false,
            link: function(scope, elem, attrs) {

                

            }

        };

        return directive;


    }

})();
