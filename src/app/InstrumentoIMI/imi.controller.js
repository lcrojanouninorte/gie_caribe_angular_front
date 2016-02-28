(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('ImiController', ImiController);

    /** @ngInject */
    function ImiController(auth, instrument, $scope, $cookies, $timeout, $stateParams) {


          $scope.chart_options = {
             responsive: true,
             scaleBeginAtZero: true,
             scaleIntegersOnly: true,
             scaleShowLabels : true,

            scaleOverride: true,
            scaleSteps: 7,
            scaleStepWidth: 1,
            scaleStartValue: 0
          };
          $scope.labels =["Estrategia", "Procesos", "Organización", "Conexiones", "Aprendizaje"];
          $scope.dimensiones = [
            [7, 7, 7, 7, 7]
          ];

        var vm = this;
        $scope.user = auth.getUser();
        $scope.finished = false;
        vm.panelTitle = "";
        vm.page = 0;
        vm.pages = [];
        vm.today = new Date();
        vm.status = {
            opened: false
        };
        $scope.answers = {};
        $scope.properties = {
            nRespuestas: 0,
            progress: 0,
            nPreguntas: 20,
            total: 0,
            index: 0,
        };
        $scope.msgs = [""];

  

        vm.tabActive = function() {
            return vm.pages.filter(function(pane) {
                return pane.active;
            })[0];
        };


        $scope.get_user_mail = function() {
            return $cookies.get("email");
        };


        vm.pages = [{
                key: "s1",
                active: true
            }
        ];
        $scope.sessions = {
            s1: {
                title: "Instrumento de Medicion de la Innovación",
                url_name: "imi_s1",
                active: true,
                state: 0,
                questions: 4,
            }
        };


        vm.open = function($event) {
            vm.status.opened = true;
        };
        vm.panelTitle = $scope.sessions.s1.title;
        vm.setTitle = function(title) {

            vm.panelTitle = title;

            $timeout(function(){$scope.refreshSlider();}, 100); 
             

        };





        function activate() {/*
            var props_watch = $scope.$watch(function() {
                return $scope.answers;
            }, function(newValues, oldValues, scope) {
                $scope.properties.nRespuestas = 0;
                $scope.properties.progress = 0;
                angular.forEach(newValues, function(snv, snk) {
                    $scope.sessions[snk].answered = 0;
                    angular.forEach(snv, function(pnv, pnk) {
                        if (pnv !== "" && typeof pnv !== "undefined") {
                            $scope.properties.nRespuestas += 1;
                            $scope.sessions[snk].answered += 1;
                        }
                    });
                    if ($scope.sessions[snk].questions === $scope.sessions[snk].answered) {
                        $scope.sessions[snk].state = 1;
                    } else {
                        $scope.sessions[snk].state = 0;
                    }
                    $scope.sessions[snk].unAnswered = $scope.sessions[snk].questions - $scope.sessions[snk].answered;
                });
                $scope.properties.progress = Math.floor(($scope.properties.nRespuestas / $scope.properties.nPreguntas * 100) - 40);
                if ((40 + $scope.properties.progress) >= 100) {
                    user.setAnswers($scope.user_id, $scope.answers);
                    props_watch();
                }
            }, true);
*/
       

        }

        $scope.isLastPage = function(){
            var active = vm.tabActive();
            var index = $.inArray(active, vm.pages);
            return index == (Object.keys(vm.pages).length-1)
        }

        $scope.swal = function( title, msg){

            swal(title, msg);
        }
        $scope.refreshSlider = function () {
            $scope.$broadcast('refreshSlider');
        }

        $scope.finish = function () {
            $scope.finished = true;

             instrument.setAnswers("imi",$scope.user_id, $scope.answers);
        }



        //get response
        $scope.user_id = $cookies.get("user_id");
        $scope.user_consult=$stateParams.id;
        if($scope.user_consult !== "" && typeof($scope.user_consult)!=="undefined" ){
            $scope.user_id = $scope.user_consult;
        }
        instrument.getAnswers("imi", $scope.user_id).then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data !== null && typeof(data.s1) != "undefined") {
                $scope.answers = data;
                $scope.dimensiones = [
                    [
                    7*(($scope.answers.s1.p1 + $scope.answers.s1.p5 + $scope.answers.s1.p14 + $scope.answers.s1.p19)/4)/100,
                    7*(($scope.answers.s1.p2 + $scope.answers.s1.p10 + $scope.answers.s1.p15 + $scope.answers.s1.p18)/4)/100,
                    7*(($scope.answers.s1.p4 + $scope.answers.s1.p7 + $scope.answers.s1.p11 + $scope.answers.s1.p16)/4)/100,
                    7*(($scope.answers.s1.p3 + $scope.answers.s1.p6 + $scope.answers.s1.p8 + $scope.answers.s1.p12)/4)/100,
                    7*(($scope.answers.s1.p9 + $scope.answers.s1.p13 + $scope.answers.s1.p17 + $scope.answers.s1.p20)/4)/100
                    ] 
                ];

             var props_watch = $scope.$watch(function() {
                return $scope.answers;
            }, function(newValues, oldValues, scope) {
                angular.forEach(newValues, function(snv, snk) {
                $scope.dimensiones = [
                    [
                    7*(($scope.answers.s1.p1 + $scope.answers.s1.p5 + $scope.answers.s1.p14 + $scope.answers.s1.p19)/4)/100,
                    7*(($scope.answers.s1.p2 + $scope.answers.s1.p10 + $scope.answers.s1.p15 + $scope.answers.s1.p18)/4)/100,
                    7*(($scope.answers.s1.p4 + $scope.answers.s1.p7 + $scope.answers.s1.p11 + $scope.answers.s1.p16)/4)/100,
                    7*(($scope.answers.s1.p3 + $scope.answers.s1.p6 + $scope.answers.s1.p8 + $scope.answers.s1.p12)/4)/100,
                    7*(($scope.answers.s1.p9 + $scope.answers.s1.p13 + $scope.answers.s1.p17 + $scope.answers.s1.p20)/4)/100
                    ] 
                ];
            })}, true);





            }else{
                //props_watch();
            }

            console.log("recibido en chrarac controller: " + $scope.answers);
            activate();


        });



    }
})();
