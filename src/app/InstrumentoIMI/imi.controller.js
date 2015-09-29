(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('ImiController', ImiController);

    /** @ngInject */
    function ImiController(auth, instrument, $scope, $cookies, $cookieStore, $timeout, $stateParams) {
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
            nPreguntas: 89,
            total: 0,
            index: 0,
            s11:{check:0}
        };
        $scope.msgs = [""];

  
        //Mensajes para pregunta answers.s3.p5
        $scope.order = {};
        $scope.order.checkResponse = [];
        $scope.order.setOrdersRes = function(ind) {
            var check = $scope.order.check[ind];
            if (check.elem) {
                $scope.properties.index -= 1;
                var index = $.inArray(check.text, $scope.order.checkResponse);
                $scope.order.checkResponse.splice(index, 1);

            } else {
                $scope.properties.index += 1;
                $scope.order.checkResponse.push(check.text);
            }
            $scope.order.message = $scope.msgs[$scope.properties.index];
            if ($scope.properties.index > 0) {
                if ($scope.properties.index === 3) {
                    $scope.answers.s3.p5 = $scope.order.checkResponse[0] + ", " + $scope.order.checkResponse[1] + ", " + $scope.order.checkResponse[2] + ", ";
                    $scope.order.message = "Su respuesta es: " + $scope.answers.s3.p5;
                }

            }
        };
        vm.tabActive = function() {
            return vm.pages.filter(function(pane) {
                return pane.active;
            })[0];
        };


        $scope.get_user_mail = function() {
            return $cookies.email;
        };

        function compare(a, b) {
            if (a.order < b.order) {
                return -1;
            }
            if (a.order > b.order) {
                return 1;
            }
            return 0;
        }


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

        vm.changePage = function(page) {
            //obtener tab activ y el indice
            var active = vm.tabActive();
            var index = $.inArray(active, vm.pages);
            user.setAnswers($scope.user_id, $scope.answers);


            if (index === 0 && page === -1) {
                vm.page = vm.pages.length - 1;
                vm.pages[vm.page].active = true;
                vm.panelTitle = $scope.sessions[vm.pages[vm.page].key].title;
                return true;
            }

            if (index === (vm.pages.length - 1) && page === 1) {
                vm.page = 0;
                vm.pages[vm.page].active = true;
                vm.panelTitle = $scope.sessions[vm.pages[vm.page].key].title;
                return true;
            }

            vm.page = index + page;
            vm.pages[vm.page].active = true;
            vm.panelTitle = $scope.sessions[vm.pages[vm.page].key].title;

            //actualizar en db

              
              $timeout(function(){$scope.refreshSlider();}, 100); 
     
        };




        function activate() {
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

             user.setAnswers($scope.user_id, $scope.answers);
        }



        //get response
        $scope.user_id = $cookies.user_id;
        $scope.user_consult=$stateParams.id;
        if($scope.user_consult !== "" && typeof($scope.user_consult)!=="undefined" ){
            $scope.user_id = $scope.user_consult;
        }
        instrument.getAnswers("imi", $scope.user_id).then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data !== null && typeof(data.s1) != "undefined") {
                $scope.answers = data;

            }else{
                //props_watch();
            }

            console.log("recibido en chrarac controller: " + $scope.answers);
            activate();


        });



    }
})();
