(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('ResultsController', ResultsController);

    /** @ngInject */
    function ResultsController(auth, user, $scope, $cookies, $cookieStore, $timeout, $location, $state) {
        var vm = this;
/*******Declaracion de vvariables************/
        $scope.results = {};
        vm.title = "Resultados:"
/******Iniciacilizacion*********************/
        user.getAllAnswers().then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data !== null) {
                $scope.results = data;
            }else{
                //props_watch();
            }

            console.log("recibido en chrarac controller: ", $scope.results);
            init();


        });
        init();
/*************Funciones************************/
        $scope.showResult = function(id){
            
            $state.go('detalle', { id: id }); 

        }
        
        function init(){
            
        }

    }

    })();
