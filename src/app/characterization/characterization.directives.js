(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .directive('saveBtn', saveBtn)
        .directive('navigationBtns', navigationBtns)
        .directive('watchChanges', watchChanges)
    .directive('orderButton', orderButton);

    /** @ngInject */
    function saveBtn(user, $timeout) {
        var directive = {
            restrict: 'E',
            templateUrl: "app/characterization/partials/btn-save.tpl.html",
            scope: false,
            link: function(scope, elem, attrs) {
                scope.saved = false;
                scope.text = "Guardar";
                scope.class = "glyphicon glyphicon-floppy-disk";
                scope.save = function() {
                    if (!scope.saved) {
                        //correr funcion para guardar
                        if (user.setAnswers(scope.user_id, scope.answers)) {
                            scope.class = "glyphicon glyphicon-floppy-saved ";
                            scope.text = "Guardado!";
                            scope.saved = true;
                        } else {
                            scope.class = "glyphicon glyphicon-floppy-disk";
                            scope.text = "Error al Guardar, intente nuevamente";
                            scope.saved = false;
                        };
                        $timeout(function() {
                            scope.text = "Guardar";
                            scope.class = "glyphicon glyphicon-floppy-disk";
                            scope.saved = false;
                        }, 2000);

                    }
                }
                scope.unsave = function() {

                }


            },

        };

        return directive;


    }

    function navigationBtns() {
        var directive = {
            restrict: 'E',
            templateUrl: "app/characterization/partials/next_before.html",
            scope: {
                next: "=",
                before: "="
            },
            link: function(scope, elem, attrs) {




            },

        };

        return directive;


    }

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

    function orderButton() {
        var directive = {
            restrict: 'E',
            templateUrl: "app/characterization/partials/orderButton.html",
            scope: false,
            link: function(scope, elem, attrs) {

                

            }

        };

        return directive;


    }

})();
