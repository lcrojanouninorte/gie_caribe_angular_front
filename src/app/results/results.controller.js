(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('ResultsController', ResultsController);

    /** @ngInject */
    function ResultsController(instrument, $scope, $cookies, $cookieStore, $timeout, $location, $state, $stateParams) {
        var vm = this;
/*******Declaracion de vvariables************/
        $scope.results = {};
        vm.title = "Resultados:"
/******Iniciacilizacion*********************/
        vm.type = $stateParams.type;
        instrument.getAllAnswers(vm.type).then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data != null) {
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
            if(vm.type == "imi"){
                 $state.go('detalle2', { id: id }); 
            }
            if(vm.type == "icai"){
                 $state.go('detalle', { id: id }); 
            }
            if(vm.type == "acap"){
                 $state.go('detalle3', { id: id }); 
            }
           

        }
        
        function init(){
            
        }

    }

    })();
