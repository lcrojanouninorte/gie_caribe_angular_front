(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('InstAux1Controller', InstAux1Controller);
   

    /** @ngInject */
    function InstAux1Controller(auth, instrument, $scope, $cookies, $timeout, $stateParams, $log) {
        var vm = this;
        vm.question_index = 0
        $scope.dataLoaded = true;
        $scope.questions = [
         [{
             text: "Alerta",
             value: 1
         }, {
             text: "Equilibrado",
             value: 2
         }, {
             text: "Listo",
             value: 3
         }, {
             text: "Ansioso",
             value: 4
         }]
     , 
         [{
             text: "Paciente",
             value: 1
         }, {
             text: "Diligente",
             value: 2
         }, {
             text: "Contundente",
             value: 3
         }, {
             text: "Preparado",
             value: 4
         }]
     , 
         [{
             text: "Hacer",
             value: 1
         }, {
             text: "Infantil",
             value: 2
         }, {
             text: "Observar",
             value: 3
         }, {
             text: "Realista",
             value: 4
         }]
     , 
         [{
             text: "Experimentar",
             value: 1
         }, {
             text: "Diversificar",
             value: 2
         }, {
             text: "Esperar",
             value: 3
         }, {
             text: "Consolidar",
             value: 4
         }]
     , 
         [{
             text: "Reservado",
             value: 1
         }, {
             text: "Serio",
             value: 2
         }, {
             text: "Gozador",
             value: 2
         }, {
             text: "Juguetón",
             value: 2
         }]
     , 
         [{
             text: "Ensayo y error" , 
             value: 1 
         },{
             text: "Alternativas",
             value: 2
         }, {
             text: "Sopesar",
             value: 3
         }, {
             text: " Evaluar",
             value: 4
         }]
     , 
         [{
             text: "Acción",
             value: 1
         }, {
             text: "Divergir",
             value: 2
         }, {
             text: "Abstraer",
             value: 3
         }, {
             text: "Convergir",
             value: 4
         }]
     , 
         [{
             text: "Directo",
             value: 1
         }, {
             text: "Posibilidades",
             value: 2
         }, {
             text: "Conceptual",
             value: 3
         }, {
             text: "Realidades",
             value: 4
         }]
     , 
         [{
             text: "Implicado",
             value: 1
         }, {
             text: "Cambiar de perspectiva",
             value: 2
         }, {
             text: "Teórico",
             value: 3
         }, {
             text: "Enfocar",
             value: 4
         }]
     , 
         [{
             text: "Silencioso",
             value: 1
         }, {
             text: "Confiable",
             value: 2
         }, {
             text: "Responsable",
             value: 3
         }, {
             text: "Imaginativo",
             value: 4
         }]
     , 
         [{
             text: "Implementar",
             value: 1
         }, {
             text: "Visualizar",
             value: 2
         }, {
             text: "Describir",
             value: 3
         }, {
             text: "Seleccionar",
             value: 4
         }]
     , 
         [{
             text: "Ejecutar",
             value: 1
         }, {
             text: "Orientado al futuro",
             value: 2
         }, {
             text: "Leer",
             value: 3
         }, {
             text: "Detallista",
             value: 4
         }]
     , 
         [{
             text: "Físico",
             value: 1
         }, {
             text: "Crear Opciones",
             value: 2
         }, {
             text: "Mental",
             value: 3
         }, {
             text: " Decidir",
             value: 4
         }]
     , 
         [{
         text: "Impersonal",
             value: 1
         }, {
             text: "Orgulloso",
             value: 2
         }, {
             text: "Esperanzado",
             value: 3
         }, {
             text: " Temeroso",
             value: 4
         }]
     , 
         [{
             text: "Practicar",
             value: 1
         }, {
             text: "Transformar",
             value: 2
         }, {
             text: "Pensar",
             value: 3
         }, {
             text: "Elegir",
             value: 4
         }]
     , 
         [{
             text: "Manejar",
             value: 1
         }, {
             text: " Especular",
             value: 2
         }, {
             text: "Contemplar",
           value: 3
         }, {
             text: "Juzgar",
             value: 4
         }]
     , 
         [{
             text: "Simpatizar",
             value: 1
         }, {
             text: "Práctico",
             value: 2
         }, {
             text: "Emotivo",
             value: 3
         }, {
             text: " Demorar",
             value: 4
         }]
     , 
         [{
             text: "Tomar contacto",
             value: 1
         }, {
             text: "Diferenciar",
             value: 2
         }, {
             text: "Reflexionar",
             value: 3
         }, {
             text: "Asegurar",
             value: 4
         }]
     ,


 ];


$scope.changeIndex = function(result){
    $timeout(function(){
        vm.question_index++;
        $log.debug("resultado:", result);
    }, 500)
     
};
      

    }
})();
