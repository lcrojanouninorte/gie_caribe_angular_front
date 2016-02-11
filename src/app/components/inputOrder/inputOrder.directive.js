(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .directive('inputOrder', inputOrder);

    /** @ngInject */
    function inputOrder() {
        var directive = {
            restrict: 'A',
            templateUrl: "app/components/inputOrder/inputOrder.html",
            scope: {
                items:"=",
                callback:"&callback"
            },
            controller: inputOrderController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }


    /** @ngInject */
    function inputOrderController($modal, $scope) {
        var vm = this;

        vm.current_index = 0;
        
        vm.msgs = [
            "Elija el Primer más importante",
            "Elija el Segundo más importante",
            "Elija el Tercer más importante",
            "Elija el ultimo más importante"

        ];
        vm.msgs_color = [
            "green",
            "yellow",
            "orange",
            "red"
        ];

        vm.getOrder = function(text){
            return  vm.checkResults.indexOf(text)+1;
        }

        vm.currentMessage= vm.msgs[0];
        vm.currentMessageColor =  vm.msgs_color[0];

            angular.forEach(vm.items, function(item, key) {
                item.value = false;
               
            });
        vm.items.finished = false;

        vm.checkResults = [];


      vm.update_result = function(text, value, index){
        if(!value){
            vm.checkResults.push(text);
             
        }else{
           var index = vm.checkResults.indexOf(text);
           vm.checkResults.splice(index,1);

        }

        if(vm.checkResults.length>=4){
            vm.items.finished=true;
            vm.callback({result:vm.items});
        }
        if(vm.checkResults.length<4){
            vm.items.finished=false;
        }
        vm.currentMessage= vm.msgs[vm.checkResults.length];
         vm.currentMessageColor =  vm.msgs_color[vm.checkResults.length];
         $('.help-block').addClass('animated fadeIn');
         $('.help-block').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
            function(){
                $('.help-block').removeClass('animated fadeIn');
            });

      }

        

       




    }

 



})();
