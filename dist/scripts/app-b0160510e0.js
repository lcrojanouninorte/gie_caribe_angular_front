
(function() {
  'use strict';

  angular
    .module('InnovationManagement', [ 'ngAnimate','toaster',  'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ui.bootstrap','vButton' , 'vr.directives.slider', 'slick', 'ngCookies', 'ngDialog', 'angular-centered', 'validation', 'validation.rule','chart.js', 'ngTasty']);

})();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .directive('sponsors', sponsors);

  /** @ngInject */
  function sponsors() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/sponsors/sponsors.html',
      scope: {  
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      var vm = this;
   
    }
  }

})();

(function() {
  'use strict';

  angular
      .module('InnovationManagement')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Angular UI Bootstrap',
        'url': 'http://angular-ui.github.io/bootstrap/',
        'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
        'logo': 'ui-bootstrap.png'
      }
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    NavbarController.$inject = ["auth"];
    return directive;

    /** @ngInject */
    function NavbarController( auth) {
      var vm = this;
        vm.isLogged = function(){

          return auth.isLogged();

        };
        vm.logout = function(){
 
          auth.logout();

          
        };
      // "vm.creation" is avaible by directive option "bindToController: true"
      
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .directive('sliderDirective', slider);

  /** @ngInject */
  function slider() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/slider/slider.html',
      scope: {
          creationDate: '='
      },
      controller: sliderController,
      controllerAs: 'vm',
      bindToController: true
    };

    sliderController.$inject = ["moment"];
    return directive;

    /** @ngInject */
    function sliderController(moment) {
      var vm = this;

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .directive('modal', modalDirective)
        .controller('ModalAttrInstanceCtrl', ModalAttrInstanceCtrl);



    /** @ngInject */


    function modalDirective() {
        var directive = {
            restrict: 'A',
            link: linkFunc,
            controller: ModalController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }
    function linkFunc(scope, el, attr, vm) {
     el.on("click", function  () {
         scope.finish();
        vm.open(attr.template)
     })
    }


    /** @ngInject */
    function ModalController($modal, $scope) {
        var vm = this;
        vm.user_id = $scope.user_id;

       

        vm.open = function(template) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: template,
                controller: 'ModalAttrInstanceCtrl',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                user_id: function () {
                  return $scope.user_id;
                }
              }

            });

            modalInstance.result.then(function(selectedItem) {
                 
            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

        }


    }
    ModalController.$inject = ["$modal", "$scope"];

    function ModalAttrInstanceCtrl($scope, $modalInstance, Restangular, user_id, $state) {
    var vm = this;
    vm.referrers = [{
        user_id: user_id,
        nombre: "",
        empresa: "",
        mail: "",
        tel: ""
    }];
    vm.add_referrer = function() {
        vm.referrers.push({
            user_id: user_id,
            nombre: "",
            empresa: "",
            mail: "",
            tel: ""
        });
    }

    $scope.ok = function() {
        console.log("referrer", vm.referrers)
        Restangular.all('referrers').post({
            referrers: vm.referrers
        });
        $state.go("instrumentos");
        $modalInstance.close();
        
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
        $state.go("instrumentos");
    };
}
ModalAttrInstanceCtrl.$inject = ["$scope", "$modalInstance", "Restangular", "user_id", "$state"];




})();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .directive('acmeMalarkey', acmeMalarkey);

  /** @ngInject */
  function acmeMalarkey(malarkey) {
    var directive = {
      restrict: 'E',
      scope: {
        extraValues: '=',
      },
      template: '&nbsp;',
      link: linkFunc,
      controller: MalarkeyController,
      controllerAs: 'vm'
    };

    MalarkeyController.$inject = ["$log", "githubContributor"];
    return directive;

    function linkFunc(scope, el, attr, vm) {
      var watcher;
      var typist = malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: true,
        postfix: ' '
      });

      el.addClass('acme-malarkey');

      angular.forEach(scope.extraValues, function(value) {
        typist.type(value).pause().delete();
      });

      watcher = scope.$watch('vm.contributors', function() {
        angular.forEach(vm.contributors, function(contributor) {
          typist.type(contributor.login).pause().delete();
        });
      });

      scope.$on('$destroy', function () {
        watcher();
      });
    }

    /** @ngInject */
    function MalarkeyController($log, githubContributor) {
      var vm = this;

      vm.contributors = [];

      activate();

      function activate() {
        return getContributors().then(function() {
          $log.info('Activated Contributors View');
        });
      }

      function getContributors() {
        return githubContributor.getContributors(10).then(function(data) {
          vm.contributors = data;

          return vm.contributors;
        });
      }
    }

  }
  acmeMalarkey.$inject = ["malarkey"];

})();

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .factory('instrument', instrument);

    /** @ngInject */
    function instrument($log, $http, Restangular) {
         var apiHost = 'https://giepiloto.herokuapp.com/';
       // var apiHost = 'https://surveyapi.herokuapp.com/';
        //var apiHost = 'http://localhost:3002/';
        var answers_structs = {

            "icai": {
                s1: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "" //p4

                },
                s2: {
                    p1: "", //p5
                    p2: "", //p6
                    p3: "", //p7
                    p4: "", //p8
                    p5: "" //p9

                },
                s3: {
                    p1: "", //p10
                    p2: "", //p11
                    p3: "", //p12
                    p4: "", //p13
                    p5: "", //p14
                    p6: "" //p15
                },
                s4: {
                    p1: "", //p16
                    p2: "", //p17
                    p3: "", //p18
                    p41: "", //p19
                    p42: "" //p20
                },
                s5: {
                    p1: "", //p21
                    p2: "", //p22
                    p3: "" //p23
                },
                s6: {
                    p1: "", //p24
                    p2: "", //p25
                    p3: "" //p26
                },
                s7: {
                    p1: "", //p27
                    p2: "", //p28
                    p3: "", //p39
                    p4: "" //p30

                },
                s8: {

                    p11: "", //p31
                    p12: "", //p32
                    p13: "", //p33
                    p14: "", //p34
                    p21: "", //p35
                    p22: "", //p36
                    p23: "", //p37
                    p24: "", //p38
                    p31: "", //p39
                    p32: "", //p40
                    p33: "", //p41
                    p34: "", //p42
                    p41: "", //p43
                    p42: "", //p44
                    p43: "", //p45
                    p44: "", //p46
                    p51: "", //p47
                    p52: "", //p48
                    p53: "", //p49
                    p54: "", //p50
                    p61: "", //p51
                    p62: "", //p52
                    p63: "", //p53
                    p64: "", //p54
                    p71: "", //p55
                    p72: "", //p56
                    p73: "", //p57
                    p74: "", //p58
                    p81: "", //p59
                    p82: "", //p60
                    p83: "", //p61
                    p84: "", //p62
                    p91: "", //p63
                    p92: "", //p64
                    p93: "", //p65
                    p94: "", //p66
                    p10: "" //P67
                },
                s9: {
                    p1: "", // p68
                    p2: "", // p69
                    p3: "", // p70
                    p4: "", // p71
                    p5: "", // p72
                    p6: "", // p73
                    p7: "", // p74
                    p8: "", // p75
                    p9: "", // p76
                    p10: "", //p77
                    p11: "", //p78
                    p12: "", //p89
                    p13: "", //p80
                    p14: "" //p81
                },
                s10: {
                    p1: "", // p82
                    p2: "", // p83
                    p3: "", // p84
                    p4: "", // p85
                    p5: "", // p86
                    p6: "", // p87
                    p7: "", // p88
                    p8: "", // p89
                    p9: "", // p90
                    p10: "", //p91
                    p11: "", //p92
                    p12: "", //p93
                },
                s11: {
                    p1: "", // p94
                    p2: "", // p95
                    p3: "", // p96
                    p4: "", // p97
                    p5: "", // p98
                    p6: "", // p99
                    p7: "", // p100
                    p8: "", // p101
                    p9: "", // p102
                    p10: "", //p103
                    p11: "", //p104
                    p12: "", //p105
                    p13: "", //p106
                    p14: "", //p107
                    p15: "", //p108
                    p16: "", //p119
                    p17: "", //p110
                    p18: "", //p111
                    p19: "", //p112
                    p20: "", //p113
                    p21: "", //p114
                    p22: "", //p115
                    p23: "", //P116
                    p24: "", //p117
                    p25: "" //p118


                }
            },
            "imi": {
                s1: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                    p5: "", //p4
                    p6: "", //p4
                    p7: "", //p4
                    p8: "", //p4
                    p9: "", //p4
                    p10: "", //p4
                    p11: "", //p4
                    p12: "", //p4
                    p13: "", //p4
                    p14: "", //p4
                    p15: "", //p4
                    p16: "", //p4
                    p17: "", //p4
                    p18: "", //p4
                    p19: "", //p4
                    p20: "" //p4
                }
            },
            "acap":{
                s1: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                    p5: "", //p4
                    p6: "", //p4
                    p7: "", //p4
                    p8: "", //p4
                    p9: "", //p4
                    p10: "", //p4
                    p11: "", //p4
                    p12: "", //p4
                    p13: "", //p4
                    p14: "", //p4
                    p15: "", //p4
                    p16: "", //p4
                    p17: "", //p4
                    p18: "", //p4
                    p19: "", //p4
                },
                s2: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                    p5: "",
                    p6: ""
                },
                s3: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                },
                s4: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                },

                s5: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3
                    p4: "", //p4
                },s6: {
                    p1: "", //p1
                    p2: "", //p2
                    p3: "", //p3 f 
                    p4: "", //p4
                    p5: "", //p4
                    p6: "", //p4
                    p7: "", //p4
                    p8: "" //p4
                },

            }
        };


        var service = {
            apiHost: apiHost,
            getAnswers: getAnswers,
            setAnswers: setAnswers,
            getAllAnswers: getAllAnswers
        };

        return service;

        function getEmptyAnswers(type) {

            var new_answers = (JSON.parse(JSON.stringify(answers_structs[type])));
            return new_answers;
        }

        function getAnswers(type, user_id) {
            var new_answers = (JSON.parse(JSON.stringify(answers_structs[type])));
            $log.info("obteniendo instrumento" + type + " de :" + user_id);
            return $http.get(apiHost + type + "?" + "user_id=" + user_id)
                .then(getAnswersComplete)
                .catch(getAnswersFailed);

            function getAnswersComplete(response) {
                $log.info("devolviendo :", response);
                if (response.status == 200) {
                    if (typeof(response.data.answers) != "undefined" && response.data.answers != null) {
                        return getInSessions(new_answers, response.data.answers);
                    } else {
                        return new_answers; //si no se ha realizado el insturmento
                    }
                }

                return new_answers;

            }

            function getAnswersFailed(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
                return new_answers;
            }
        }

        function getAllAnswers(type) {
            var new_answers = (JSON.parse(JSON.stringify(answers_structs[type])));
            $log.info("obteniendo  todas las respuestas de  " + type);
            return $http.get(apiHost + type)
                .then(getAllAnswersComplete)
                .catch(getAllAnswersFailed);

            function getAllAnswersComplete(response) {
                $log.info("devolviendo :", response);
                if (response.status == 200) {
                    if (typeof(response.data.answers) != "undefined" && response.data.answers != null) {
                        return response.data.answers;
                    } else {
                        return new_answers;
                    }
                }

                return new_answers;

            }

            function getAllAnswersFailed(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
                return new_answers;
            }
        }


        function getInSessions(answer_structure, data) {
            //var data = {characterization:{user_id:5}}
            var index = 1;
            //  var anwers_ordered = (JSON.parse(JSON.stringify(answers_structs[type])));
            angular.forEach(answer_structure, function(session, skey) {
                angular.forEach(session, function(pnv, pnk) {
                    $log.debug("trayendo :" + data["p" + index] + " de p" + index + " a " + skey + pnk);
                    answer_structure[skey][pnk] = data["p" + index];
                    if (data["p" + index] === "t") {
                        answer_structure[skey][pnk] = true;
                    }
                    if (data["p" + index] === "f") {
                        answer_structure[skey][pnk] = false;
                    }
                    index++;

                });

            });

            return answer_structure;
        }


        function setAnswers(type, user_id, answers_new) {

                var data_to = {
                    answers: {
                        user_id: user_id.toString()
                    }
                }
            if (user_id != "" && answers_new != null) {
                var index = 1;
                angular.forEach(answers_new, function(session, skey) {
                    angular.forEach(session, function(pnv, pnk) {
                        data_to.answers["p" + index] = pnv || "";

                        $log.debug("insertando :" + pnv + " en  " + "p" + index);
                        index++;

                    });

                });
            } else {
                return false;
            }
            $log.debug("insertando el user_id:" + user_id + " como: " + data_to + " en " + apiHost + type, data_to);
            //return $http.post(apiHost+type, data_to).
            //then(setAnswersComplete, setAnswersFailed);
             var pretty = angular.toJson(data_to);
            return Restangular.all(type).post(pretty).then(setAnswersComplete, setAnswersFailed);


            function setAnswersComplete(response) {
                if (typeof(response.data.answers) != "undefined" || response.data.answers != null) {
                    $log.debug("se guardo!", response);
                    return response.data.answers;
                } else {
                    $log.debug("no se guardo!", response);
                    return null;
                }
            }

            function setAnswersFailed(error) {
                $log.error('XHR Failed for setAnswers.\n' + angular.toJson(error.data, true));
                return false;
            }
        }

    }
    instrument.$inject = ["$log", "$http", "Restangular"];
})();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .factory('githubContributor', githubContributor);

  /** @ngInject */
  function githubContributor($log, $http) {
    var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';

    var service = {
      apiHost: apiHost,
      getContributors: getContributors
    };

    return service;

    function getContributors(limit) {
      if (!limit) {
        limit = 30;
      }

      return $http.get(apiHost + '/contributors?per_page=' + limit)
        .then(getContributorsComplete)
        .catch(getContributorsFailed);

      function getContributorsComplete(response) {
        return response.data;
      }

      function getContributorsFailed(error) {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      }
    }
  }
  githubContributor.$inject = ["$log", "$http"];
})();

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
    inputScalaController.$inject = ["$modal", "$scope"];

 



})();

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
    inputOrderController.$inject = ["$modal", "$scope"];

 



})();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .factory('ciiuv_revs', ciiuv_revs);

  /** @ngInject */
  function ciiuv_revs($log, $http) {
    var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';
    var data = [];

    var service = {
      apiHost: apiHost,
      getCiiuv: getCiiuv
    };

    return service;

    function getCiiuv() {

      var data = [
      {rev:"0111", desc:" CULTIVO DE CEREALES (EXCEPTO ARROZ), LEGUMBRES Y SEMILLAS OLEAGINOSAS"},
      {rev:'0112', desc:' CULTIVO DE ARROZ'},
      {rev:'0113', desc:' CULTIVO DE HORTALIZAS, RAICES Y TUBERCULOS'},
      {rev:'0115', desc:' CULTIVO DE PLANTAS TEXTILES'},
      {rev:'0119', desc:' OTROS CULTIVOS TRANSITORIOS N.C.P.'},
      {rev:'0121', desc:' CULTIVO DE FRUTAS TROPICALES Y SUBTROPICALES'},
      {rev:'0122', desc:' CULTIVO DE PLATANO Y BANANO'},
      {rev:'0123', desc:' CULTIVO DE CAFÉ'},
      {rev:'0125', desc:' CULTIVO DE FLOR DE CORTE'},
      {rev:'0126', desc:' CULTIVO DE PALMA PARA ACEITE (PALMA AFRICANA) Y OTROS FRUTOS OLEAGINOSOS'},
      {rev:'0127', desc:' CULTIVO DE PLANTAS CON LAS QUE SE PREPARAN BEBIDAS'},
      {rev:'0129', desc:' OTROS CULTIVOS PERMANENTES N.C.P.'},
      {rev:'0140', desc:' GANADERÍA'},
      {rev:'0141', desc:' CRIA DE GANADO BOVINO Y BUFALINO'},
      {rev:'0143', desc:' CRIA DE OVEJAS Y CABRAS'},
      {rev:'0144', desc:' CRIA DE GANADO PORCINO'},
      {rev:'0145', desc:' CRIA DE AVES DE CORRAL'},
      {rev:'0149', desc:' CRIA DE OTROS ANIMALES N.C.P.'},
      {rev:'0150', desc:' EXPLOTACION MIXTA (AGRICOLA Y PECUARIA)'},
      {rev:'0161', desc:' ACTIVIDADES DE APOYO A LA AGRICULTURA'},
      {rev:'0162', desc:' ACTIVIDADES DE APOYO A LA GANADERIA'},
      {rev:'0163', desc:' ACTIVIDADES POSTERIORES A LA COSECHA'},
      {rev:'0164', desc:' TRATAMIENTO DE SEMILLAS PARA PROPAGACION'},
      {rev:'0170', desc:' CAZA ORDINARIA Y MEDIANTE TRAMPAS Y ACTIVIDADES DE SERVICIOS CONEXAS'},
      {rev:'0210', desc:' SILVICULTURA Y OTRAS ACTIVIDADES FORESTALES'},
      {rev:'0220', desc:' EXTRACCION DE MADERA'},
      {rev:'0240', desc:' SERVICIOS DE APOYO A LA SILVICULTURA'},
      {rev:'0311', desc:' PESCA MARITIMA'},
      {rev:'0321', desc:' ACUICULTURA MARITIMA'},
      {rev:'0322', desc:' ACUICULTURA DE AGUA DULCE'},
      {rev:'1011', desc:' PROCESAMIENTO Y CONSERVACION DE CARNE Y PRODUCTOS CARNICOS'},
      {rev:'1012', desc:' PROCESAMIENTO Y CONSERVACION DE PESCADOS, CRUSTACEOS Y MOLUSCOS'},
      {rev:'1020', desc:' PROCESAMIENTO Y CONSERVACION DE FRUTAS, LEGUMBRES, HORTALIZAS Y TUBERCULOS'},
      {rev:'1030', desc:' ELABORACION DE ACEITES Y GRASAS DE ORIGEN VEGETAL Y ANIMAL'},
      {rev:'1040', desc:' ELABORACION DE PRODUCTOS LACTEOS'},
      {rev:'1051', desc:' ELABORACION DE PRODUCTOS DE MOLINERIA'},
      {rev:'1062', desc:' DESCAFEINADO, TOSTION Y MOLIENDA DEL CAFE'},
      {rev:'1081', desc:' ELABORACION DE PRODUCTOS DE PANADERIA'},
      {rev:'1082', desc:' ELABORACION DE CACAO, CHOCOLATE Y PRODUCTOS DE CONFITERIA'},
      {rev:'1084', desc:' ELABORACION DE COMIDAS Y PLATOS PREPARADOS'},
      {rev:'1089', desc:' ELABORACION DE OTROS PRODUCTOS ALIMENTICIOS N.C.P.'},
      {rev:'1090', desc:' ELABORACION DE ALIMENTOS PREPARADOS PARA ANIMALES'},
      {rev:'1101', desc:' DESTILACION, RECTIFICACION Y MEZCLA DE BEBIDAS ALCOHOLICAS'},
      {rev:'1103', desc:' PRODUCCION DE MALTA, ELABORACION DE CERVEZAS Y OTRAS BEBIDAS MALTEADAS'},
      {rev:'1104', desc:' ELABORACION DE BEBIDAS NO ALCOHOLICAS, PRODUCCION DE AGUAS MINERALES Y OTRAS AGUAS EMBOTELLADAS'},
      {rev:'1610', desc:' ASERRADO, ACEPILLADO E IMPREGNACION DE LA MADERA'},
      {rev:'1620', desc:' FABRICACION DE HOJAS DE MADERA PARA ENCHAPADO; FABRICACION DE TABLEROS CONTRACHAPADOS TABLEROS LAMINADOS, TABLEROS DE PARTICULAS Y OTROS TABLEROS Y PA'},
      {rev:'1630', desc:' FABRICACION DE PARTES Y PIEZAS DE MADERA, DE CARPINTERIA Y EBANISTERIA PARA LA CONSTRUCCION'},
      {rev:'1640', desc:' FABRICACION DE RECIPIENTES DE MADERA'},
      {rev:'1690', desc:' FABRICACION DE OTROS PRODUCTOS DE MADERA; FABRICACION DE ARTICULOS DE CORCHO, CESTERIA Y ESPARTERIA'},
      {rev:'2011', desc:' FABRICACION DE SUSTANCIAS Y PRODUCTOS QUIMICOS BASICOS'},
      {rev:'2012', desc:' FABRICACION DE ABONOS Y COMPUESTOS INORGANICOS NITROGENADOS'},
      {rev:'2013', desc:' FABRICACION DE PLASTICOS EN FORMAS PRIMARIAS'},
      {rev:'2014', desc:' FABRICACION DE CAUCHO SINTETICO EN FORMAS PRIMARIAS'},
      {rev:'2821', desc:' FABRICACION DE MAQUINARIA AGROPECUARIA Y FORESTAL'},
      {rev:'2825', desc:' FABRICACION DE MAQUINARIA PARA LA ELABORACION DE ALIMENTOS, BEBIDAS Y TABACO'},
      {rev:'4620', desc:' COMERCIO AL POR MAYOR DE MATERIAS PRIMAS AGROPECUARIAS; ANIMALES VIVOS'},
      {rev:'4631', desc:' COMERCIO AL POR MAYOR DE PRODUCTOS ALIMENTICIOS'},
      {rev:'4632', desc:' COMERCIO AL POR MAYOR DE BEBIDAS Y TABACO'},
      {rev:'4653', desc:' COMERCIO AL POR MAYOR DE MAQUINARIA Y EQUIPO AGROPECUARIOS'},
      {rev:'4659', desc:' COMERCIO AL POR MAYOR DE OTROS TIPOS DE MAQUINARIA Y EQUIPO N.C.P.'},
      {rev:'4711', desc:' (P) COMERCIO AL POR MENOR EN ESTABLECIMIENTOS NO ESPECIALIZADOS CON SURTIDO COMPUESTO PRINCIPALMENTE POR ALIMENTOS, BEBIDAS O TABACO'},
      {rev:'4719', desc:' COMERCIO AL POR MENOR EN ESTABLECIMIENTOS NO ESPECIALIZADOS, CON SURTIDO COMPUESTO PRINCIPALMENTE POR PRODUCTOS DIFERENTES DE ALIMENTOS'},
      {rev:'4721', desc:' COMERCIO AL POR MENOR DE PRODUCTOS AGRICOLAS PARA EL CONSUMO EN ESTABLECIMIENTOS ESPECIALIZADOS'},
      {rev:'4722', desc:' COMERCIO AL POR MENOR DE LECHE, PRODUCTOS LACTEOS Y HUEVOS, EN ESTABLECIMIENTOS ESPECIALIZADOS'},
      {rev:'4723', desc:' COMERCIO AL POR MENOR DE CARNES (INCLUYE AVES DE CORRAL), PRODUCTOS CARNICOS, PESCADOS Y PRODUCTOS DE MAR, EN ESTABLECIMIENTOS ESPECIALIZADOS'},
      {rev:'4724', desc:' COMERCIO AL POR MENOR DE BEBIDAS Y PRODUCTOS DEL TABACO, EN ESTABLECIMIENTOS ESPECIALIZADOS'},
      {rev:'4729', desc:' COMERCIO AL POR MENOR DE OTROS PRODUCTOS ALIMENTICIOS N.C.P., EN ESTABLECIMIENTOS ESPECIALIZADOS'}


      ];
      return data;



    }
  }
  ciiuv_revs.$inject = ["$log", "$http"];
})();

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
    ciiuvModalController.$inject = ["$modal", "$scope"];

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
    ModalController.$inject = ["ciiuv_revs", "$scope", "$modalInstance"];



})();

    (function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .factory('auth', auth);

    /** @ngInject */
    function auth($http, $log, $cookies, Restangular) {
        var apiLogIn = 'https://giepiloto.herokuapp.com/session/signin';
        var apiSingUp = 'https://giepiloto.herokuapp.com/users/signup';
        var user = {};
        var token = null;


        var service = {
            login: login,
            singup: singup,
            logout: logout,
            isLogged: isLogged,
            getUser: getUser,
            getUserByToken:getUserByToken,
            resetPassRequest: resetPassRequest,
            resetPass: resetPass
        };

        return service;

        function getUser() {
            return $cookies.get('user_id');
        }
        function getUserByToken(token) {
            return Restangular.all('users').customGET("user_id",{token:token});
        }
        function resetPass(data) {
            return Restangular.all('password/update').post({reset:data})
           
        }
        function resetPassRequest(email) {

            return  Restangular.all('password/reset').post({reset:{"email":email}});
        }

        function singup(data) {

            return $http.post(apiSingUp, data).
            then(getAnswersComplete, getAnswersFailed);

            function getAnswersComplete(response) {
                if (response.status == 200) {
                    if (response.data.user.auth_token != null) {
                        $cookies.put('user_id', response.data.user.id);
                        $cookies.put('token', response.data.user.auth_token);
                        $cookies.put('email', response.data.user.email);
                        return $cookies.get('user_id');
                    } else {
                        return null;
                    }

                } else {
                    return null;
                }
            }

            function getAnswersFailed(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
                return null;
            }
        }
        
        function login(data) {


            return $http.post(apiLogIn, data)
                .then(getAnswersComplete, getAnswersFailed);


            function getAnswersComplete(response) {
                if (response.status == 200) {
                    if (response.data.user.auth_token != null) {
                        $log.debug('logged as', response.data);

                        $cookies.put('user_id', response.data.user.id);
                        $cookies.put('token', response.data.user.auth_token);
                        $cookies.put('email', response.data.user.email);
                        $log.debug('cokies as', $cookies);
                        return $cookies.get('user_id');
                    } else {
                        return null;
                    }

                } else {
                    return null;
                }
            }


            function getAnswersFailed(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
                return null;
            }
        }

        function login(data) {


            return $http.post(apiLogIn, data)
                .then(getAnswersComplete, getAnswersFailed);


            function getAnswersComplete(response) {
                if (response.status == 200) {
                    if (response.data.user.auth_token != null) {
                        $log.debug('logged as', response.data);

                        $cookies.put('user_id' , response.data.user.id);
                        $cookies.put('token' , response.data.user.auth_token);
                        $cookies.put('email' , response.data.user.email);
                        $log.debug('cokies as', $cookies);
                        return $cookies.get("user_id");
                    } else {
                        return null;
                    }

                } else {
                    return null;
                }
            }


            function getAnswersFailed(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
                return null;
            }
        }


        function logout(data) {
            //$log.debug("entro a logo con la info: ", data);
            //var data = {characterization:{user_id:5}}
            delete $cookies.remove("user_id");
            delete $cookies.remove("token");
            delete $cookies.remove("email");

            //reload
            // $state.go('login', {}, { reload: true });
        }


        function isLogged() {
          //  $log.debug('entro a islogged', $cookies);
            if ($cookies.get("user_id")) {
                return true;
            } else {
                return false;
            }

        }


    }
    auth.$inject = ["$http", "$log", "$cookies", "Restangular"];
})();

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
    InstAux1Controller.$inject = ["auth", "instrument", "$scope", "$cookies", "$timeout", "$stateParams", "$log"];
})();

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
    ResultsController.$inject = ["instrument", "$scope", "$cookies", "$cookieStore", "$timeout", "$location", "$state", "$stateParams"];

    })();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, $scope, $http, $log) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1440607514482;
    vm.showToastr = showToastr;
    $scope.data = "";

    $scope.prueba =         function () {
             
           
            return $http.get("http://localhost/api/web_server/")
                .then(success)
                .catch(fail);

            function success(response) {
                $log.info("devolviendo :", response);
                 $scope.data = response.data;
            }

            function fail(error) {
                $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
               
            }
        }

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
  MainController.$inject = ["$timeout", "webDevTec", "toastr", "$scope", "$http", "$log"];
})();

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('LoginController', LoginController);

    /** @ngInject */

    function LoginController(auth, $scope, $cookies, $cookieStore, $location, $state, toaster) {


        var vm = this;
        vm.isBusy = false;
        vm.reset_pass_dir = "https://surveyapi.herokuapp.com/password/reset";
        vm.buttonClick = function () {
            vm.isBusy = !vm.isBusy;
              
        }
        function clear() {
            $scope.answers = {};
            $scope.properties = {
                nRespuestas: 0,
                progress: 0,
                nPreguntas: 90,
                total: 0,
                index: 0
            };
            $scope.sessions = {};



        };
        
        $scope.user = {
            user: {
                email: "",
                password: "",
                password_confirmation: ""
            }
        };
        $scope.session = {
            session: {
                email: "",
                password: ""
            }
        };
        activate();

        function activate() {
            $scope.cookies = $cookies;
        }

        $scope.ingresar = function(form) {
             vm.isBusy = true;
            clear();
            $scope.user.user.password_confirmation = $scope.user.user.password;
            $scope.session.session.email = $scope.user.user.email;
            $scope.session.session.password = $scope.user.user.password;
            auth.login($scope.session).then(function(data) {
                if (data != null) {
                    $scope.user_id = data;
                    $state.go('instrumentos');
                } else {
                   
                    toaster.pop('info', "Información:", "Usuario no registrado, o contraseña invalida");
                      vm.isBusy = false;
                    vm.classAnimation = '';

                    //$state.go('login');
                }
            }); 
          




        }


        $scope.registrar = function() {
            vm.isBusy = true;
            clear();
            $scope.user.user.password_confirmation = $scope.user.user.password;
            $scope.session.session.email = $scope.user.user.email;
            $scope.session.session.password = $scope.user.user.password;
            auth.singup($scope.user.user).then(function(data) {
                if (data != null) {
                    $state.go('icai');
                } else {
                    vm.isBusy = false;
                    toaster.pop('info', "Información:", "Usuario ya existe");
                   
                     vm.classAnimation = '';

                    //$state.go('login');
                }
            });
             



        }
        $scope.passReset = function() {
            swal({
                title: 'Recuperar Contraseña',
                html: '<p>Ingrese el correo electronico con el cual se registro anteriormente</p><br><label>E-mail <input id="input-field"></label>',
                showCancelButton: true,
                closeOnConfirm: false
            }, function() {
                 swal.disableButtons();
                 auth.resetPassRequest($('#input-field').val()).then(function(response){
                    if(response.status == 200){
                        swal({
                            html: 'Se ha enviado un correo con las instrucciones a: <strong>' + $('#input-field').val() + '</strong>'
                        }); 
                    }else{
                        swal({
                            html: 'No existe un usuario registrado con el E-mail: <strong>' + $('#input-field').val() + '</strong>'
                        });
                    };
                 }, 
                 function(){
                    swal({
                            html: 'No existe un usuario registrado con el E-mail: <strong>' + $('#input-field').val() + '</strong>'
                    });
                 }
                 );

               
            });
        }





    }
    LoginController.$inject = ["auth", "$scope", "$cookies", "$cookieStore", "$location", "$state", "toaster"];


})();
// if (data != null) {
//                        if (data.user.id != null) {
//                            //ok
//                            $cookies.email = data.user.email,
//                                $cookies.token = data.user.auth_token;
//                            $cookies.user_id = data.user.id,
//                                $state.go('caracterizacion');

//                        } else {
//                            //try login
//                            auth.login($scope.session)
//                                .then(function(data) {
//                                    if (data.user.id) {
//                                        if (data.user.id != null) {
//                                            //ok
//                                            $cookies.email = data.user.email,
//                                                $cookies.token = data.user.auth_token;
//                                            $cookies.user_id = data.user.id,

//                                        } else {
//                                            //try login
//                                            alert("El usuario no existe y no puede ser creado, intente nuevamente")
//                                            $state.go('login');
//                                        }

//                                    } else {

//                                    }
//                                });
//                        }

//                    } else {
//                        auth.login($scope.session).then(function(data) {
//                            if (typeof(data) != "undefined") {
//                                if (data.user.id != null) {
//                                    //ok
//                                    $cookies.email = data.user.email,
//                                        $cookies.token = data.user.auth_token;
//                                    $cookies.user_id = data.user.id,
//                                        $state.go('caracterizacion');

//                                } else {
//                                    //try login
//                                    alert("Credenciales invalidas")
//                                    $state.go('login');
//                                }

//                            } else {
//                                alert("Credenciales invalidas");
//                                $state.go('login');
//                            }
//                        });

//                    }
//                })
//        };

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */

    function ResetPasswordController(auth, $scope, $cookies, $cookieStore, $location, $state, toaster, user, token) {
        var vm = this;
        vm.mail = "";
        vm.password = "";
        vm.password_conf = "";
        vm.session = {
            session: {
                email: "",
                password: ""
            }
        };
		vm.submit = function(){
		    auth.resetPass({
		        "token": token,
		        "email": vm.mail,
		        "password": vm.password,
		        "password_confirmation": vm.password_conf
		    }).then(
		        function(response) {
		            if (response.status == 200) {
		                 swal({
							    title: 'Contraseña Actualizada',
							    type: 'success',
							    showCancelButton: false,
							    confirmButtonColor: '#3085d6',
							    confirmButtonClass: 'confirm-class'
							   
							}, function(isConfirm) {
							    if (isConfirm) {
							    vm.session.session.email = vm.mail;
            					vm.session.session.password = vm.password;
							    auth.login( vm.session).then(function(data) {
						                if (data != null) {
						                    $scope.user_id = data;
						                    $state.go('instrumentos');
						                } else {
						                   
						                     $state.go('login'); // go to login
						                }
						            }); 
							      
							    } else {
							         
							    }
							});

		            } else {
		                 swal("Ocurrio un error");
		            }

		        }
		        ,
		        function(response){
		        	if(response.status == 401){
		        	 swal("El token ya expiro, solicite uno nuevo en la pagina principal.");
		        	}
		        	if(response.status == 406){
		        		 swal("Las contraseñas no coinciden");
		        	}
		        	
		        }

		    );

		}
		vm.show_expired = false;
		if(user == null){
			vm.show_expired = true;
		}else{
			 vm.mail = user.email;
		}

	 }
	 ResetPasswordController.$inject = ["auth", "$scope", "$cookies", "$cookieStore", "$location", "$state", "toaster", "user", "token"];
        	
        
    


})();

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('InstrumentsController', InstrumentsController);

     /** @ngInject */
    function InstrumentsController($cookies, $log) {
        var vm = this;
       $log.debug('cookies en instrument', $cookies);


    }
    InstrumentsController.$inject = ["$cookies", "$log"];
})();

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
    ImiController.$inject = ["auth", "instrument", "$scope", "$cookies", "$timeout", "$stateParams"];
})();

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
     saveBtnController.$inject = ["$timeout", "instrument"];
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

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('IcaiController', IcaiController);
   

    /** @ngInject */
    function IcaiController(auth, instrument, $scope, $cookies, $timeout, $stateParams, $log) {
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
        $scope.sessions = {
            s1: {
                title: "Identificación de la Empresa",
                active: true,
                state: 0,
                questions: 4,
            },
            s2: {
                title: "Datos del Informante",
                state: 0,
                questions: 5,
            },
            s3: {
                title: "Características Básicas de la Empresa",
                active: false,
                state: 0,
                questions: 6,

            },
            s4: {
                title: "Innovación de Producto",
                state: 0,
                questions: 4,

            },
            s5: {
                title: "Innovación en Procesos",
                state: 0,
                questions: 3,

            },
            s6: {
                title: "Innovación Organizacional",
                state: 0,
                questions: 3,

            },
            s7: {
                title: "Innovación en Marketing",
                state: 0,
                questions: 4,

            },
            s8: {
                title: "Actividades de Innovación",
                state: 0,
                questions: 10,

            },
            s9: {
                title: "Objetivos y Efectos",
                state: 0,
                questions: 14,

            },
            s10: {
                title: "Obstáculos a la Innovación",
                state: 0,
                questions: 12,

            },
            s11: {
                title: "Actividad Relacional",
                state: 0,
                questions: 24

            }
        };

   
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
            return $cookies.get("email");
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
            }, {
                key: "s2",
                active: false
            }, {
                key: "s3",
                active: false
            }, {
                key: "s4",
                active: false
            }, {
                key: "s5",
                active: false
            }, {
                key: "s6",
                active: false
            }, {
                key: "s7",
                active: false
            }, {
                key: "s8",
                active: false
            }, {
                key: "s9",
                active: false
            }, {
                key: "s10",
                active: false
            }, {
                key: "s11",
                active: false
            }


        ];

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
            instrument.setAnswers("icai",$scope.user_id, $scope.answers);


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
            if ($scope.answers.s3.p5 === "") {
                $scope.properties.index = 0;
                $scope.order.check = [{
                    enable: false,
                    text: "Local",
                    elem: false,
                }, {
                    enable: false,
                    text: "Nacional",
                    elem: false,
                }, {
                    enable: false,
                    text: "Intenacional",
                    elem: false,
                }];
            } else {
                $scope.properties.index = 3;
                $scope.order.check = [{
                    enable: true,
                    text: "Local",
                    elem: true,
                }, {
                    enable: true,
                    text: "Nacional",
                    elem: true,
                }, {
                    enable: true,
                    text: "Intenacional",
                    elem: true,
                }];
            }

            $scope.msgs = [
                "Elija el primer más importante",
                "Elija el segundo más importante",
                "Elija el tercer más importante",
                $scope.answers.s3.p5
            ];

            $scope.order.message = $scope.msgs[$scope.properties.index];

            var props_watch = $scope.$watch(function() {
                return $scope.answers;
            }, function(newValues, oldValues, scope) {
                $scope.properties.nRespuestas = 0;
                $scope.properties.progress = 0;
                angular.forEach(newValues, function(snv, snk) {
                    $scope.sessions[snk].answered = 0;
                    angular.forEach(snv, function(pnv, pnk) {
                        if (pnv != "" && typeof pnv != "undefined") {
                            $scope.properties.nRespuestas += 1;
                            $scope.sessions[snk].answered += 1;
                        }
                    });
                    if ($scope.sessions[snk].questions == $scope.sessions[snk].answered) {
                        $scope.sessions[snk].state = 1;
                    } else {
                        $scope.sessions[snk].state = 0;
                    }
                    $scope.sessions[snk].unAnswered = $scope.sessions[snk].questions - $scope.sessions[snk].answered;
                });
                $scope.properties.progress = Math.floor(($scope.properties.nRespuestas / $scope.properties.nPreguntas * 100) - 40);
                if ((40 + $scope.properties.progress) >= 100) {
                   // instrument.setAnswers($scope.user_id, $scope.answers);
                    props_watch();
                }
            }, true);

       
$log.debug("salio de a icai active", $cookies);
        }

        $scope.isLastPage = function(){
            var active = vm.tabActive();
            var index = $.inArray(active, vm.pages);
            return index === (Object.keys(vm.pages).length-1);
        };

        $scope.swal = function( title, msg, type){

            swal(title, msg, type);
        };
        $scope.input_field = "s";

        $scope.refreshSlider = function () {
            $scope.$broadcast('refreshSlider');
        };

        $scope.finish = function () {
            $scope.finished = true;

             instrument.setAnswers("icai",$scope.user_id, $scope.answers);
        };



        //get response
        $scope.user_id = $cookies.get("user_id");
        $scope.user_consult=$stateParams.id;
        if($scope.user_consult !== "" && typeof($scope.user_consult)!=="undefined" ){
            $scope.user_id = $scope.user_consult;
        }
        instrument.getAnswers("icai", $scope.user_id).then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data != null && typeof(data.s1) != "undefined") {
                $scope.answers = data;
                 $log.debug("despues de obtener answers  ", $cookies);

            }else{
                //props_watch();
            }

            console.log("recibido en chrarac controller: " + $scope.answers);
            $log.debug("antes de active  ", $cookies);

            activate();


        });

$log.debug("fin de icai ", $cookies);

    }
    IcaiController.$inject = ["auth", "instrument", "$scope", "$cookies", "$timeout", "$stateParams", "$log"];
})();

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .controller('AcapController', AcapController);

    /** @ngInject */
    function AcapController(auth, instrument, $scope, $cookies, $timeout, $stateParams, $log) {
        var vm = this;
        $scope.user = auth.getUser();
        $scope.finished = false;
        vm.panelTitle = "";
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

  



        $scope.get_user_mail = function() {
            return $cookies.get("email");
        };


        vm.tabActive = function() {
            var result = null;
            angular.forEach($scope.sessions, function(session, key){
                if(session.active){
                    result = session;
                }
            });
            return result;
        };
        //modelo
        $scope.sessions = [
             {
                id:"s1",
                title: "Sección 1",
                url_name: "acap_s1",
                active: true,
                state: 0,
                questions: 19,
            },
            {
                id:"s2",
                title: "Sección 2",
                url_name: "acap_s2",
                active: false,
                state: 0,
                questions: 6,
            },{
                id:"s3",
                title: "Sección 3",
                url_name: "acap_s3",
                active: false,
                state: 0,
                questions: 4,
            },{
                id:"s4",
                title: "Sección 4",
                url_name: "acap_s4",
                active: false,
                state: 0,
                questions: 4,
            },{
                id:"s5",
                title: "Sección 5",
                url_name: "acap_s5",
                active: false,
                state: 0,
                questions: 4,
            },{
                id:"s6",
                title: "Sección 6",
                url_name: "acap_s6",
                active: false,
                state: 0,
                questions: 4,
            }
        ];


        vm.open = function($event) {
            vm.status.opened = true;
        };
        vm.panelTitle = $scope.sessions[0].title;
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
           // $log.debug("activo: ", active);
            var index = $.inArray(active, $scope.sessions);
           // $log.debug("index: ", index);
            return index == (Object.keys($scope.sessions).length-1)
        }
        vm.changePage = function(page) {
            var next_page =0;
            //obtener tab activ y el indice
            var active = vm.tabActive();
            var index = $.inArray(active, $scope.sessions);
            instrument.setAnswers("acap",$scope.user_id, $scope.answers);


            if (index === 0 && page === -1) {
                next_page = $scope.sessions.length - 1;
                $scope.sessions[next_page].active = true;
                vm.panelTitle = $scope.sessions[next_page].title;
                return true;
            }

            if (index === ($scope.sessions.length - 1) && page === 1) {
                next_page = 0;
                $scope.sessions[next_page].active = true;
                vm.panelTitle = $scope.sessions[next_page].title;
                return true;
            }

            next_page = index + page;
            $scope.sessions[next_page].active = true;
            vm.panelTitle = $scope.sessions[next_page].title;

            //actualizar en db

              
              //$timeout(function(){$scope.refreshSlider();}, 100); 
     
        };

        $scope.swal = function( title, msg){

            swal(title, msg);
        }
        $scope.refreshSlider = function () {
            $scope.$broadcast('refreshSlider');
        }

        $scope.finish = function () {
            $scope.finished = true;

             instrument.setAnswers("acap",$scope.user_id, $scope.answers);
        }



        //get response
        $scope.user_id = $cookies.get("user_id");
        $scope.user_consult=$stateParams.id;
        if($scope.user_consult !== "" && typeof($scope.user_consult)!=="undefined" ){
            $scope.user_id = $scope.user_consult;
        }


        instrument.getAnswers("acap", $scope.user_id).then(function(data) {

            //$scope.answers = data;
            if (!$.isEmptyObject(data) && data !== null && typeof(data.s1) != "undefined") {
                $scope.answers = data;

            }else{
                //props_watch();
            }

            console.log("recibido en chrarac controller: " ,$scope.answers);
            activate();


        });



    }
    AcapController.$inject = ["auth", "instrument", "$scope", "$cookies", "$timeout", "$stateParams", "$log"];
})();

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $anchorScroll, $rootScope, $location, $cookies, auth, $state) {
        $anchorScroll.yOffset = 50;
        $log.debug('runBlock end');
        $log.debug('cookies en run', $cookies);
        //Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

            var isLogin = toState.name === "login";
            if (isLogin) {
                return; // no need to redirect 
            }
            $log.debug('to states', toState);

            if (!auth.isLogged() && toState.authenticate) {
                $log.debug('to states', toState);
                $log.debug('cookies', $cookies);
                $log.debug('not logdded');
                event.preventDefault(); // stop current execution
                $state.go('login', {}, {
                    reload: true
                });
            } else {
                // $state.go( toState.name); 

            }

        });
    }
    runBlock.$inject = ["$log", "$anchorScroll", "$rootScope", "$location", "$cookies", "auth", "$state"];


})();

(function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('icai', {
                url: '/icai',
                templateUrl: 'app/InstrumentoICAI/icai.html',
                controller: 'IcaiController',
                controllerAs: 'icaiCtrl',
                authenticate: false
            })
            .state('imi', {
                url: '/imi',
                templateUrl: 'app/InstrumentoIMI/imi.html',
                controller: 'ImiController',
                controllerAs: 'imiCtrl',
                authenticate: false
            }).state('acap', {
                url: '/acap',
                templateUrl: 'app/InstrumentoACAP/acap.html',
                controller: 'AcapController',
                controllerAs: 'acapCtrl',
                authenticate: false
            })
            .state('instrumentos', {
                url: '/instrumentos',
                templateUrl: 'app/Instrumentos/Instrumentos.html',
                controller: 'InstrumentsController',
                controllerAs: 'instCtrl',
                authenticate: false
            }).state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'login'


            }).state('test1', {
                url: '/test1',
                templateUrl: 'app/InstrumentosAux/test1.html',
                controller: 'LoginController',
                controllerAs: 'login'


            }).state('resultados_dashboard', {
                url: '/resultados',
                templateUrl: 'app/results/resultsDashboard.html'


            }).state('resultados', {
                url: '/resultados/:type',
                templateUrl: 'app/results/results.html',
                controller: 'ResultsController',
                controllerAs: 'restultsCtrl'


            }).state('detalle', {
                url: '/detalle/:id',
                templateUrl: 'app/InstrumentoICAI/icai.detalle.html',
                controller: 'IcaiController',
                controllerAs: 'icaiCtrl',


            }).state('resultados2', {
                url: '/resultados',
                templateUrl: 'app/results/results.html',
                controller: 'ResultsController',
                controllerAs: 'restultsCtrl'


            }).state('detalle2', {
                url: '/detalle2/:id',
                templateUrl: 'app/InstrumentoIMI/imi.detalle.html',
                controller: 'ImiController',
                controllerAs: 'imiCtrl',

            }).state('detalle3', {
                url: '/detalle3/:id',
                templateUrl: 'app/InstrumentoACAP/acap.detalle.html',
                controller: 'AcapController',
                controllerAs: 'acapCtrl',

            }).state('instrumento_aux1', {
                url: '/instrumentoAux1',
                templateUrl: 'app/InstrumentosAux/InstrumentoAux1/instrumentoAux1.html',
                controller: 'InstAux1Controller',
                controllerAs: 'vm',

            }).state('password_reset', {
                url: '/password/reset?:token',
                templateUrl: 'app/Password/resetPassword.html',
                controller: 'ResetPasswordController',
                controllerAs: 'vm',
                authenticate: false,
                resolve:{
                    user:  ["auth", "$stateParams", "$log", function(auth, $stateParams, $log){
                            return auth.getUserByToken($stateParams.token).then(setAnswersComplete, setAnswersFailed);
                            function setAnswersComplete(response) {
                                if (response.status == 200) {
                                    if (response.data.user.id != null) {
                                       return response.data.user;
                                    } else {
                                        return null;
                                    }

                                } else {
                                    return null;
                                }
                            }

                            function setAnswersFailed(error) {
                                $log.error('XHR Failed for setAnswers.\n' + angular.toJson(error.data, true));
                                return null;
                            }
                    }],
                    token: ["$stateParams", function($stateParams){
                        return $stateParams.token;
                    }]
                }


            });

        $urlRouterProvider.otherwise('/login');
    }
    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

})();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .directive("getAttr", getAttr);

  /** @ngInject */
  function getAttr($logProvider, toastr) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
  }
  getAttr.$inject = ["$logProvider", "toastr"];

})();

/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment);

})();

(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, toastr,  $locationProvider,$validationProvider, RestangularProvider) {
      RestangularProvider.setBaseUrl('https://giepiloto.herokuapp.com/');
   // RestangularProvider.setBaseUrl('https://surveyapi.herokuapp.com/');
    //RestangularProvider.setBaseUrl('http://localhost:3002/');
    RestangularProvider.setFullResponse(true);
   delete $httpProvider.defaults.headers.common["X-Requested-With"];
   // window.sr = new scrollReveal();

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
  }
  config.$inject = ["$logProvider", "$httpProvider", "toastr", "$locationProvider", "$validationProvider", "RestangularProvider"];

})();

angular.module("InnovationManagement").run(["$templateCache", function($templateCache) {$templateCache.put("app/InstrumentoACAP/acap.detalle.html","<div class=\"container-fluid  \">\r\n    <div id=\"slider1_container\" style=\"position: relative; top: 0px; left: 0px; width: 1400px; height: 200px;\">\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: 1400px; height: 200px;\">\r\n            <div><img u=\"image\" src=\"assets/images/image1.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image2.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image3.jpg\" /></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" style=\"margin-top:30px\" id=\"survey\">\r\n        <a name=\"survey\" href></a>\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n     <!--       <p>Responda las siguientes preguntas. Puede guardar su progreso haciendo clic en guardar.</p>-->\r\n        </div>\r\n    </div>\r\n    <!--\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1\">\r\n            <div class=\"progress  progress-striped active\">\r\n                <div class=\"progress-bar progress-bar-info\" style=\"width: {{properties.progress}}%;\">{{properties.progress}}%</div>\r\n            </div>\r\n        </div> \r\n    </div>\r\n    -->\r\n    <div class=\"jumbotron\" ng-show=\"finished==true\">\r\n        <div ng-repeat=\"session in sessions\">\r\n        </div>\r\n        <div class=\"container\">\r\n            <div class=\"col-md-offset-2 col-md-8\">\r\n                <div class=\"alert alert-success\" role=\"alert\">\r\n                <h4><span class=\"glyphicon glyphicon-ok\"></span> Felicitaciones! Usted a Finalizado Satisfactoriamente, Gracias por su tiempo.</h4></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n            <div class=\"panel panel-primary panel-opacity animated slideInLeft\" >\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <h3 class=\"panel-title\">ACAP {{acapCtrl.panelTitle}}</h3>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-8\">\r\n                           \r\n                        </div>\r\n                    </div>\r\n                     <p>Responda las siguientes preguntas. Puede guardar su progreso haciendo clic en guardar.</p>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <form name=\"characterizationForm\" class=\"form-horizontal\" role=\"form\" novalidate>\r\n                        <p>Bienvenido {{get_user_mail()}} </p>\r\n                        <tabset class=\"tabs-left col-sm-12\">\r\n                            <tab class=\"animated fadeInDown\" class=\"col-md-12\" ng-repeat=\"session in sessions\" active=\"session.active\" ng-click=\"acapCtrl.setTitle(session.title)\">\r\n                                <tab-heading >{{session.title}}\r\n                                    <!--<span ng-show=\"sessions[page.key].unAnswered<=0\" class=\"label label-success \"><p class=\"glyphicon glyphicon-ok\"></p></span>\r\n                                 <span ng-show=\"sessions[page.key].showUnaswered>0\" class=\"badge\">{{sessions[page.key].unAnswered}}</span>--></tab-heading>\r\n                                <fieldset class=\"animated fadeIn\">\r\n                                    <legend>\r\n                                       <!--  <div save-btn userid=\"user_id\" type=\"\'acap\'\" answers=\"answers\" class=\"animated pulse\" ></div>-->\r\n                                    </legend>\r\n                                    <ng-include src=\"\'app/InstrumentoACAP/questions/\'+session.url_name+\'.html\'\" class=\"my-fade-animation\"></ng-include>\r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\" ng-show=\"properties.progress>=100\" ng-click=\"finish()\">\r\n                                        <div class=\"btn-group text-center\" role=\"group\">\r\n                                           \r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\">\r\n                                        <br>\r\n                                        <br>\r\n                                        <div class=\"btn-group text-center\" role=\"group\">\r\n \r\n                                        \r\n                                        </div>\r\n                                    </div>\r\n                                </fieldset>\r\n                                <!--        <div class=\"row\" style=\"margin-top:10px\">\r\n                                    <h4>Active pane:</h4>\r\n                                    <pre>{{acapCtrl.tabActive()}}</pre>\r\n                                </div>-->\r\n                            </tab>\r\n                        </tabset>\r\n                    </form>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                    <div class=\"container\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-12 \">\r\n                                <!-- Default panel contents -->\r\n                                <div>Comuníquese con cualquiera de nuestros consultores a las siguientes líneas telefónicas: 301 485 1346 - 301 485 1536 - 300 265 8510 - 301 485 1421 - 301 485 1567 - 301 484 9940.</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    </div>\r\n</div>\r\n<script type=\"text/ng-template\" id=\"myModalContent.html\">\r\n \r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">Finalizado Correctamente!</h3>\r\n    </div> <div class=\"col-md-12\">\r\n    <div class=\"modal-body\"> \r\n    <p>Si conoce a otras empresas que puedan estar interesadas en estre proyecto, por favor indique los datos solicitados a continuación:</p>\r\n       \r\n           \r\n            <br>\r\n            <div class=\"row\" ng-repeat=\"referrer in vm.referrers\">\r\n                <label class=\"col-md-3\">Nombre:\r\n                    <input type=\"text\" value=\"referrer.nombre\" ng-model=\"referrer.nombre\" >\r\n                </label>\r\n                <label class=\"col-md-3\">Empresa:\r\n                    <input type=\"text\" value=\"referrer.empresa\" ng-model=\"referrer.empresa\">\r\n                </label class=\"col-md-3\">\r\n                <label class=\"col-md-3\">Email:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.mail\">\r\n                </label>\r\n                <label class=\"col-md-3\">Telefono:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.tel\">\r\n                </label>\r\n            </div>\r\n            <br>\r\n            <button class=\"btn btn-sm btn-info\" ng-click=\"vm.add_referrer()\">Añadir otra Empresa</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Enviar</button>\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"cancel()\">Finalizar</button>\r\n    </div>\r\n \r\n\r\n    </script>\r\n<script>\r\njQuery(document).ready(function($) {\r\n    var options = {};\r\n    var jssor_slider1 = new $JssorSlider$(\'slider1_container\', options);\r\n\r\n    //responsive code begin\r\n    //you can remove responsive code if you don\'t want the slider scales\r\n    //while window resizes\r\n    function ScaleSlider() {\r\n        var parentWidth = $(\'#slider1_container\').parent().width();\r\n        if (parentWidth) {\r\n            jssor_slider1.$ScaleWidth(parentWidth);\r\n        } else\r\n            window.setTimeout(ScaleSlider, 30);\r\n    }\r\n    //Scale slider after document ready\r\n    ScaleSlider();\r\n\r\n    //Scale slider while window load/resize/orientationchange.\r\n    $(window).bind(\"load\", ScaleSlider);\r\n    $(window).bind(\"resize\", ScaleSlider);\r\n    $(window).bind(\"orientationchange\", ScaleSlider);\r\n    //responsive code end\r\n});\r\n</script>\r\n");
$templateCache.put("app/InstrumentoACAP/acap.html","<div class=\"container-fluid  \">\r\n    <div id=\"slider1_container\" style=\"position: relative; top: 0px; left: 0px; width: 1400px; height: 200px;\">\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: 1400px; height: 200px;\">\r\n            <div><img u=\"image\" src=\"assets/images/image1.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image2.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image3.jpg\" /></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" style=\"margin-top:30px\" id=\"survey\">\r\n        <a name=\"survey\" href></a>\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n     <!--       <p>Responda las siguientes preguntas. Puede guardar su progreso haciendo clic en guardar.</p>-->\r\n        </div>\r\n    </div>\r\n    <!--\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1\">\r\n            <div class=\"progress  progress-striped active\">\r\n                <div class=\"progress-bar progress-bar-info\" style=\"width: {{properties.progress}}%;\">{{properties.progress}}%</div>\r\n            </div>\r\n        </div> \r\n    </div>\r\n    -->\r\n    <div class=\"jumbotron\" ng-show=\"finished==true\">\r\n        <div ng-repeat=\"session in sessions\">\r\n        </div>\r\n        <div class=\"container\">\r\n            <div class=\"col-md-offset-2 col-md-8\">\r\n                <div class=\"alert alert-success\" role=\"alert\">\r\n                <h4><span class=\"glyphicon glyphicon-ok\"></span> Felicitaciones! Usted a Finalizado Satisfactoriamente, Gracias por su tiempo.</h4></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n            <div class=\"panel panel-primary panel-opacity animated slideInLeft\" >\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <h3 class=\"panel-title\">ACAP {{acapCtrl.panelTitle}}</h3>\r\n\r\n                        </div>\r\n\r\n                        <div class=\"col-md-8\">\r\n                           \r\n                        </div>\r\n                    </div>\r\n                     <p>Responda las siguientes preguntas. Puede guardar su progreso haciendo clic en guardar.</p>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <form name=\"characterizationForm\" class=\"form-horizontal\" role=\"form\" novalidate>\r\n                        <p>Bienvenido {{get_user_mail()}} </p>\r\n                        <tabset class=\"tabs-left col-sm-12\">\r\n                            <tab class=\"animated fadeInDown\" class=\"col-md-12\" ng-repeat=\"session in sessions\" active=\"session.active\" ng-click=\"acapCtrl.setTitle(session.title)\">\r\n                                <tab-heading >{{session.title}}\r\n                                    <!--<span ng-show=\"sessions[page.key].unAnswered<=0\" class=\"label label-success \"><p class=\"glyphicon glyphicon-ok\"></p></span>\r\n                                 <span ng-show=\"sessions[page.key].showUnaswered>0\" class=\"badge\">{{sessions[page.key].unAnswered}}</span>--></tab-heading>\r\n                                <fieldset class=\"animated fadeIn\">\r\n                                    <legend>\r\n                                        <div save-btn userid=\"user_id\" type=\"\'acap\'\" answers=\"answers\" class=\"animated pulse\" ></div>\r\n                                    </legend>\r\n                                    <ng-include src=\"\'app/InstrumentoACAP/questions/\'+session.url_name+\'.html\'\" class=\"my-fade-animation\"></ng-include>\r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\" ng-show=\"properties.progress>=100\" ng-click=\"finish()\">\r\n                                        <div class=\"btn-group text-center\" role=\"group\">\r\n                                            <button type=\"button\" class=\"btn btn-md  btn-success\">\r\n                                                <div class=\"glyphicon glyphicon-send\"></div> Finalizar\r\n                                            </button>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\">\r\n                                        <br>\r\n                                        <br>\r\n                                        <div class=\"btn-group text-center\" role=\"group\">\r\n \r\n                                            <button type=\"button\" class=\"btn btn-xs  btn-primary\" ng-click=\"acapCtrl.changePage(1)\" ng-show=\"!isLastPage()\">\r\n                                                Siguiente\r\n                                                <div class=\"glyphicon glyphicon-chevron-right\"></div>\r\n                                            </button>\r\n                                            <button type=\"button\" class=\"btn btn-xs  btn-success\" ng-click=\"acapCtrl.changePage(0)\" ng-show=\"isLastPage()\" modal template=\"myModalContent.html\">\r\n                                                Finalizar\r\n                                                <div class=\"glyphicon glyphicon-check\"></div>\r\n                                            </button>\r\n                                        </div>\r\n                                    </div>\r\n                                </fieldset>\r\n                                <!--        <div class=\"row\" style=\"margin-top:10px\">\r\n                                    <h4>Active pane:</h4>\r\n                                    <pre>{{acapCtrl.tabActive()}}</pre>\r\n                                </div>-->\r\n                            </tab>\r\n                        </tabset>\r\n                    </form>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                    <div class=\"container\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-12 \">\r\n                                <!-- Default panel contents -->\r\n                                <div>Comuníquese con cualquiera de nuestros consultores a las siguientes líneas telefónicas: 301 485 1346 - 301 485 1536 - 300 265 8510 - 301 485 1421 - 301 485 1567 - 301 484 9940.</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    </div>\r\n</div>\r\n<script type=\"text/ng-template\" id=\"myModalContent.html\">\r\n \r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">Finalizado Correctamente!</h3>\r\n    </div> <div class=\"col-md-12\">\r\n    <div class=\"modal-body\"> \r\n    <p>Si conoce a otras empresas que puedan estar interesadas en estre proyecto, por favor indique los datos solicitados a continuación:</p>\r\n       \r\n           \r\n            <br>\r\n            <div class=\"row\" ng-repeat=\"referrer in vm.referrers\">\r\n                <label class=\"col-md-3\">Nombre:\r\n                    <input type=\"text\" value=\"referrer.nombre\" ng-model=\"referrer.nombre\" >\r\n                </label>\r\n                <label class=\"col-md-3\">Empresa:\r\n                    <input type=\"text\" value=\"referrer.empresa\" ng-model=\"referrer.empresa\">\r\n                </label class=\"col-md-3\">\r\n                <label class=\"col-md-3\">Email:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.mail\">\r\n                </label>\r\n                <label class=\"col-md-3\">Telefono:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.tel\">\r\n                </label>\r\n            </div>\r\n            <br>\r\n            <button class=\"btn btn-sm btn-info\" ng-click=\"vm.add_referrer()\">Añadir otra Empresa</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Enviar</button>\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"cancel()\">Finalizar</button>\r\n    </div>\r\n \r\n\r\n    </script>\r\n<script>\r\njQuery(document).ready(function($) {\r\n    var options = {};\r\n    var jssor_slider1 = new $JssorSlider$(\'slider1_container\', options);\r\n\r\n    //responsive code begin\r\n    //you can remove responsive code if you don\'t want the slider scales\r\n    //while window resizes\r\n    function ScaleSlider() {\r\n        var parentWidth = $(\'#slider1_container\').parent().width();\r\n        if (parentWidth) {\r\n            jssor_slider1.$ScaleWidth(parentWidth);\r\n        } else\r\n            window.setTimeout(ScaleSlider, 30);\r\n    }\r\n    //Scale slider after document ready\r\n    ScaleSlider();\r\n\r\n    //Scale slider while window load/resize/orientationchange.\r\n    $(window).bind(\"load\", ScaleSlider);\r\n    $(window).bind(\"resize\", ScaleSlider);\r\n    $(window).bind(\"orientationchange\", ScaleSlider);\r\n    //responsive code end\r\n});\r\n</script>\r\n");
$templateCache.put("app/InstrumentoIMI/imi.detalle.html","<div class=\"container-fluid \">\r\n    <div id=\"slider1_container\" style=\"position: relative; top: 0px; left: 0px; width: 1400px; height: 200px;\">\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: 1400px; height: 200px;\">\r\n            <div><img u=\"image\" src=\"assets/images/image1.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image2.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image3.jpg\" /></div>\r\n        </div>\r\n    </div>\r\n   \r\n    <div class=\"row\" style=\"margin-top:30px\" id=\"survey\">\r\n        <a name=\"survey\" href></a>\r\n\r\n    </div>\r\n    <!--\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1\">\r\n            <div class=\"progress  progress-striped active\">\r\n                <div class=\"progress-bar progress-bar-info\" style=\"width: {{properties.progress}}%;\">{{properties.progress}}%</div>\r\n            </div>\r\n        </div> \r\n    </div>\r\n    -->\r\n    <div class=\"jumbotron\" ng-show=\"finished==true\">\r\n        <div ng-repeat=\"session in sessions\">\r\n        </div>\r\n        <div class=\"container\">\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n            <div class=\"panel panel-primary panel-opacity\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <h3 class=\"panel-title\">{{imiCtrl.panelTitle}}</h3>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <form name=\"characterizationForm\" class=\"form-horizontal\" role=\"form\" novalidate>\r\n                        \r\n                        <tabset class=\"tabs-left col-sm-12\">\r\n                            <tab class=\"col-md-12\" ng-repeat=\"page in imiCtrl.pages\" active=\"page.active\" ng-click=\"imiCtrl.setTitle(sessions[page.key].title)\">\r\n                                <tab-heading>{{sessions[page.key].title}}\r\n                                    <!--<span ng-show=\"sessions[page.key].unAnswered<=0\" class=\"label label-success \"><p class=\"glyphicon glyphicon-ok\"></p></span>\r\n                                 <span ng-show=\"sessions[page.key].showUnaswered>0\" class=\"badge\">{{sessions[page.key].unAnswered}}</span>--></tab-heading>\r\n                                <fieldset>\r\n                                    <legend>\r\n                                       <!--<div save-btn userid=\"user_id\" type=\"\'imi\'\" answers=\"answers\" ></div>-->\r\n                                    </legend>\r\n                                      <ng-include src=\"\'app/InstrumentoIMI/questions/\'+sessions[page.key].url_name+\'.html\'\" class=\"my-fade-animation\"></ng-include>\r\n\r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\">\r\n                                        <br>\r\n                                        <br>\r\n\r\n                                    </div>\r\n                                </fieldset>\r\n                                <!--        <div class=\"row\" style=\"margin-top:10px\">\r\n                                    <h4>Active pane:</h4>\r\n                                    <pre>{{imiCtrl.tabActive()}}</pre>\r\n                                </div>-->\r\n                            </tab>\r\n                        </tabset>\r\n                    </form>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n\r\n                    <div class=\"container\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-12 \">\r\n                                <!-- Default panel contents -->\r\n                                <div>Comuníquese con cualquiera de nuestros consultores a las siguientes líneas telefónicas: 301 485 1346 - 301 485 1536 - 300 265 8510 - 301 485 1421 - 301 485 1567 - 301 484 9940.</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    </div>\r\n</div>\r\n    <script type=\"text/ng-template\" id=\"myModalContent.html\">\r\n \r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">Finalizado Correctamente!</h3>\r\n    </div> <div class=\"col-md-10 col-md-offset-1\">\r\n    <div class=\"modal-body\"> \r\n    <p>Si conoce otras empresas que pueda estar interesada en estre proyecto, por favor indique los datos solicitados acontinuación:</p>\r\n       \r\n           \r\n            <br>\r\n            <div class=\"row\" ng-repeat=\"referrer in vm.referrers\">\r\n                <label>Nombre:\r\n                    <input type=\"text\" value=\"referrer.nombre\" ng-model=\"referrer.nombre\">\r\n                </label>\r\n                <label>Empresa:\r\n                    <input type=\"text\" value=\"referrer.empresa\" ng-model=\"referrer.empresa\">\r\n                </label>\r\n                <label>Email:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.email\">\r\n                </label>\r\n            </div>\r\n            <br>\r\n            <button class=\"btn btn-sm btn-info\" ng-click=\"vm.add_referrer()\">Añadir otra Empresa</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Enviar</button>\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"cancel()\">Finalizar</button>\r\n    </div>\r\n \r\n\r\n    </script>\r\n\r\n\r\n <script>\r\n    jQuery(document).ready(function($) {\r\n        var options = {};\r\n        var jssor_slider1 = new $JssorSlider$(\'slider1_container\', options);\r\n\r\n        //responsive code begin\r\n        //you can remove responsive code if you don\'t want the slider scales\r\n        //while window resizes\r\n        function ScaleSlider() {\r\n            var parentWidth = $(\'#slider1_container\').parent().width();\r\n            if (parentWidth) {\r\n                jssor_slider1.$ScaleWidth(parentWidth);\r\n            } else\r\n                window.setTimeout(ScaleSlider, 30);\r\n        }\r\n        //Scale slider after document ready\r\n        ScaleSlider();\r\n\r\n        //Scale slider while window load/resize/orientationchange.\r\n        $(window).bind(\"load\", ScaleSlider);\r\n        $(window).bind(\"resize\", ScaleSlider);\r\n        $(window).bind(\"orientationchange\", ScaleSlider);\r\n        //responsive code end\r\n    });\r\n    </script>");
$templateCache.put("app/InstrumentoIMI/imi.html","<div class=\"container-fluid \">\r\n    <div id=\"slider1_container\" style=\"position: relative; top: 0px; left: 0px; width: 1400px; height: 200px;\">\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: 1400px; height: 200px;\">\r\n            <div><img u=\"image\" src=\"assets/images/image1.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image2.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image3.jpg\" /></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\" style=\"margin-top:30px\" id=\"survey\">\r\n        <a name=\"survey\" href></a>\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n            <p>Responda las siguientes preguntas. Puede guardar su progreso haciendo clic en guardar.</p>\r\n        </div>\r\n    </div>\r\n    <!--\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1\">\r\n            <div class=\"progress  progress-striped active\">\r\n                <div class=\"progress-bar progress-bar-info\" style=\"width: {{properties.progress}}%;\">{{properties.progress}}%</div>\r\n            </div>\r\n        </div> \r\n    </div>\r\n    -->\r\n    <div class=\"jumbotron\" ng-show=\"finished==true\">\r\n        <div ng-repeat=\"session in sessions\">\r\n        </div>\r\n        <div class=\"container\">\r\n            <div class=\"col-md-offset-2 col-md-8\">\r\n                <div class=\"alert alert-success\" role=\"alert\">\r\n                    <h4><span class=\"glyphicon glyphicon-ok\"></span> Felicitaciones! Usted a Finalizado Satisfactoriamente, Gracias por su tiempo.</h4></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n            <div class=\"panel panel-primary panel-opacity\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <h3 class=\"panel-title\">{{imiCtrl.panelTitle}}</h3>\r\n                        </div>\r\n                        <div class=\"col-md-8\">\r\n                           \r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <form name=\"characterizationForm\" class=\"form-horizontal\" role=\"form\" novalidate>\r\n                        <p>Bienvenido {{get_user_mail()}} </p>\r\n                        <tabset class=\"tabs-left col-sm-12\">\r\n                            <tab class=\"col-md-12\" ng-repeat=\"page in imiCtrl.pages\" active=\"page.active\" ng-click=\"imiCtrl.setTitle(sessions[page.key].title)\">\r\n                                <tab-heading>{{sessions[page.key].title}}\r\n                <div >\r\n                    <canvas id=\"radar\" width=\"500\" height=\"500\" class=\"chart chart-radar\"\r\n                      chart-data=\"dimensiones\" chart-labels=\"labels\" chart-options=\"chart_options\">\r\n                    </canvas> \r\n\r\n                </div>\r\n                                    <!--<span ng-show=\"sessions[page.key].unAnswered<=0\" class=\"label label-success \"><p class=\"glyphicon glyphicon-ok\"></p></span>\r\n                                 <span ng-show=\"sessions[page.key].showUnaswered>0\" class=\"badge\">{{sessions[page.key].unAnswered}}</span>--></tab-heading>\r\n                                <fieldset>\r\n                                    <legend>\r\n                                        <div save-btn userid=\"user_id\" type=\"\'imi\'\" answers=\"answers\" ></div>\r\n                                    </legend>\r\n                                    <ng-include src=\"\'app/InstrumentoIMI/questions/\'+sessions[page.key].url_name+\'.html\'\" class=\"my-fade-animation\"></ng-include>\r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\" ng-show=\"properties.progress>=100\" ng-click=\"finish()\">\r\n                                        <div class=\"btn-group text-center\" role=\"group\">\r\n                                            <button type=\"button\" class=\"btn btn-md  btn-success\">\r\n                                                <div class=\"glyphicon glyphicon-send\"></div> Finalizar\r\n                                            </button>\r\n                                        </div>\r\n                                    </div>\r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\">\r\n                                        <br>\r\n                                        <br>\r\n                                        <div class=\"btn-group text-center\" role=\"group\">\r\n \r\n                                            <button type=\"button\" class=\"btn btn-xs  btn-primary\" ng-click=\"imiCtrl.changePage(1)\" ng-show=\"!isLastPage()\">\r\n                                                Siguiente\r\n                                                <div class=\"glyphicon glyphicon-chevron-right\"></div>\r\n                                            </button>\r\n                                            <button type=\"button\" class=\"btn btn-xs  btn-success\" ng-click=\"icaiCtrl.changePage(0)\" ng-show=\"isLastPage()\" modal template=\"myModalContent.html\">\r\n                                                Finalizar\r\n                                                <div class=\"glyphicon glyphicon-check\"></div>\r\n                                            </button>\r\n                                        </div>\r\n\r\n                                    </div>\r\n                                </fieldset>\r\n                                <!--        <div class=\"row\" style=\"margin-top:10px\">\r\n                                    <h4>Active pane:</h4>\r\n                                    <pre>{{imiCtrl.tabActive()}}</pre>\r\n                                </div>-->\r\n\r\n                            </tab>\r\n                        </tabset>\r\n                    </form>\r\n                </div>\r\n\r\n                <div class=\"panel-footer\">\r\n \r\n                    <div class=\"container\">\r\n\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-12 \">\r\n                                <!-- Default panel contents -->\r\n                                <div>Comuníquese con cualquiera de nuestros consultores a las siguientes líneas telefónicas: 301 485 1346 - 301 485 1536 - 300 265 8510 - 301 485 1421 - 301 485 1567 - 301 484 9940.</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    </div>\r\n</div>\r\n<script type=\"text/ng-template\" id=\"myModalContent.html\">\r\n \r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">Finalizado Correctamente!</h3>\r\n    </div> <div class=\"col-md-12\">\r\n    <div class=\"modal-body\"> \r\n\r\n    <p>Si conoce a otras empresas que puedan estar interesadas en estre proyecto, por favor indique los datos solicitados a continuación:</p>\r\n       \r\n           \r\n            <br>\r\n            <div class=\"row\" ng-repeat=\"referrer in vm.referrers\">\r\n                <label class=\"col-md-3\">Nombre:\r\n                    <input type=\"text\" value=\"referrer.nombre\" ng-model=\"referrer.nombre\" >\r\n                </label>\r\n                <label class=\"col-md-3\">Empresa:\r\n                    <input type=\"text\" value=\"referrer.empresa\" ng-model=\"referrer.empresa\">\r\n                </label class=\"col-md-3\">\r\n                <label class=\"col-md-3\">Email:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.mail\">\r\n                </label>\r\n                <label class=\"col-md-3\">Telefono:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.tel\">\r\n                </label>\r\n            </div>\r\n            <br>\r\n            <button class=\"btn btn-sm btn-info\" ng-click=\"vm.add_referrer()\">Añadir otra Empresa</button>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Enviar</button>\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"cancel()\">Finalizar</button>\r\n    </div>\r\n \r\n\r\n    </script>\r\n<script>\r\njQuery(document).ready(function($) {\r\n    var options = {};\r\n    var jssor_slider1 = new $JssorSlider$(\'slider1_container\', options);\r\n\r\n    //responsive code begin\r\n    //you can remove responsive code if you don\'t want the slider scales\r\n    //while window resizes\r\n    function ScaleSlider() {\r\n        var parentWidth = $(\'#slider1_container\').parent().width();\r\n        if (parentWidth) {\r\n            jssor_slider1.$ScaleWidth(parentWidth);\r\n        } else\r\n            window.setTimeout(ScaleSlider, 30);\r\n    }\r\n    //Scale slider after document ready\r\n    ScaleSlider();\r\n\r\n    //Scale slider while window load/resize/orientationchange.\r\n    $(window).bind(\"load\", ScaleSlider);\r\n    $(window).bind(\"resize\", ScaleSlider);\r\n    $(window).bind(\"orientationchange\", ScaleSlider);\r\n    //responsive code end\r\n});\r\n</script>\r\n");
$templateCache.put("app/InstrumentoICAI/icai.detalle.html","<div class=\"container-fluid \">\r\n    <div id=\"slider1_container\" style=\"position: relative; top: 0px; left: 0px; width: 1400px; height: 200px;\">\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: 1400px; height: 200px;\">\r\n            <div><img u=\"image\" src=\"assets/images/image1.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image2.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image3.jpg\" /></div>\r\n        </div>\r\n    </div>\r\n   \r\n    <div class=\"row\" style=\"margin-top:30px\" id=\"survey\">\r\n        <a name=\"survey\" href></a>\r\n\r\n    </div>\r\n    <!--\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1\">\r\n            <div class=\"progress  progress-striped active\">\r\n                <div class=\"progress-bar progress-bar-info\" style=\"width: {{properties.progress}}%;\">{{properties.progress}}%</div>\r\n            </div>\r\n        </div> \r\n    </div>\r\n    -->\r\n    <div class=\"jumbotron\" ng-show=\"finished==true\">\r\n        <div ng-repeat=\"session in sessions\">\r\n        </div>\r\n        <div class=\"container\">\r\n            <div class=\"col-md-offset-2 col-md-8\">\r\n                <div class=\"alert alert-success\" role=\"alert\">\r\n                    <h4><span class=\"glyphicon glyphicon-ok\"></span> Felicitaciones! Usted a Finalizado Satisfactoriamente, Gracias por su tiempo.</h4></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n            <div class=\"panel panel-primary panel-opacity\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <h3 class=\"panel-title\">{{icaiCtrl.panelTitle}}</h3>\r\n                        </div>\r\n\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <form name=\"characterizationForm\" class=\"form-horizontal\" role=\"form\" novalidate>\r\n                       \r\n                        <tabset class=\"tabs-left col-sm-12\">\r\n                            <tab class=\"col-md-12\" ng-repeat=\"page in icaiCtrl.pages\" active=\"page.active\" ng-click=\"icaiCtrl.setTitle(sessions[page.key].title)\">\r\n                                <tab-heading>{{sessions[page.key].title}}\r\n                                    <!--<span ng-show=\"sessions[page.key].unAnswered<=0\" class=\"label label-success \"><p class=\"glyphicon glyphicon-ok\"></p></span>\r\n                                 <span ng-show=\"sessions[page.key].showUnaswered>0\" class=\"badge\">{{sessions[page.key].unAnswered}}</span>--></tab-heading>\r\n                                <fieldset>\r\n                                     <legend>\r\n                                        <!--<div save-btn userid=\"user_id\" type=\"\'icai\'\" answers=\"answers\" ></div>-->\r\n                                        \r\n                                    </legend>\r\n                                    <ng-include src=\"\'app/InstrumentoICAI/fieldsets/\'+sessions[page.key].title+\'.html\'\" class=\"my-fade-animation\"></ng-include>\r\n\r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\">\r\n                                        <br>\r\n                                        <br>\r\n\r\n                                    </div>\r\n                                </fieldset>\r\n                                <!--        <div class=\"row\" style=\"margin-top:10px\">\r\n                                    <h4>Active pane:</h4>\r\n                                    <pre>{{icaiCtrl.tabActive()}}</pre>\r\n                                </div>-->\r\n                            </tab>\r\n                        </tabset>\r\n                    </form>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                    <div class=\"container\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-12 \">\r\n                                <!-- Default panel contents -->\r\n                                <div>Comuníquese con cualquiera de nuestros consultores a las siguientes líneas telefónicas: 301 485 1346 - 301 485 1536 - 300 265 8510 - 301 485 1421 - 301 485 1567 - 301 484 9940.</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    </div>\r\n</div>\r\n    <script type=\"text/ng-template\" id=\"myModalContent.html\">\r\n \r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">Finalizado Correctamente!</h3>\r\n    </div> <div class=\"col-md-10 col-md-offset-1\">\r\n    <div class=\"modal-body\"> \r\n    <p>Si conoce otras empresas que pueda estar interesada en estre proyecto, por favor indique los datos solicitados acontinuación:</p>\r\n       \r\n           \r\n            <br>\r\n            <div class=\"row\" ng-repeat=\"referrer in vm.referrers\">\r\n                <label>Nombre:\r\n                    <input type=\"text\" value=\"referrer.nombre\" ng-model=\"referrer.nombre\">\r\n                </label>\r\n                <label>Empresa:\r\n                    <input type=\"text\" value=\"referrer.empresa\" ng-model=\"referrer.empresa\">\r\n                </label>\r\n                <label>Email:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.email\">\r\n                </label>\r\n            </div>\r\n            <br>\r\n            <button class=\"btn btn-sm btn-info\" ng-click=\"vm.add_referrer()\">Añadir otra Empresa</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Enviar</button>\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"cancel()\">Finalizar</button>\r\n    </div>\r\n \r\n\r\n    </script>\r\n\r\n\r\n <script>\r\n    jQuery(document).ready(function($) {\r\n        var options = {};\r\n        var jssor_slider1 = new $JssorSlider$(\'slider1_container\', options);\r\n\r\n        //responsive code begin\r\n        //you can remove responsive code if you don\'t want the slider scales\r\n        //while window resizes\r\n        function ScaleSlider() {\r\n            var parentWidth = $(\'#slider1_container\').parent().width();\r\n            if (parentWidth) {\r\n                jssor_slider1.$ScaleWidth(parentWidth);\r\n            } else\r\n                window.setTimeout(ScaleSlider, 30);\r\n        }\r\n        //Scale slider after document ready\r\n        ScaleSlider();\r\n\r\n        //Scale slider while window load/resize/orientationchange.\r\n        $(window).bind(\"load\", ScaleSlider);\r\n        $(window).bind(\"resize\", ScaleSlider);\r\n        $(window).bind(\"orientationchange\", ScaleSlider);\r\n        //responsive code end\r\n    });\r\n    </script>");
$templateCache.put("app/InstrumentoICAI/icai.html","<div class=\"container-fluid \" data-sr-container=\'{ \"reset\":true, \"vFactor\": 0.1 }\'>\r\n    <div id=\"slider1_container\" style=\"position: relative; top: 0px; left: 0px; width: 1400px; height: 200px;\" data-sr=\'enter bottom wait 0.1s\'>\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: 1400px; height: 200px;\">\r\n            <div><img u=\"image\" src=\"assets/images/image1.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image2.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image3.jpg\" /></div>\r\n        </div>\r\n    </div>\r\n   \r\n    <div class=\"row\" style=\"margin-top:30px\" id=\"survey\">\r\n        <a name=\"survey\" href></a>\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n            <p>Responda las siguientes preguntas. Puede guardar su progreso haciendo clic en guardar.</p>\r\n        </div>\r\n    </div>\r\n    <!--\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1\">\r\n            <div class=\"progress  progress-striped active\">\r\n                <div class=\"progress-bar progress-bar-info\" style=\"width: {{properties.progress}}%;\">{{properties.progress}}%</div>\r\n            </div>\r\n        </div> \r\n    </div>\r\n    -->\r\n    <div class=\"jumbotron\" ng-show=\"finished==true\">\r\n        <div ng-repeat=\"session in sessions\">\r\n        </div>\r\n        <div class=\"container\">\r\n            <div class=\"col-md-offset-2 col-md-8\">\r\n                <div class=\"alert alert-success\" role=\"alert\">\r\n                    <h4><span class=\"glyphicon glyphicon-ok\"></span> Felicitaciones! Usted a Finalizado Satisfactoriamente, Gracias por su tiempo.</h4></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n            <div class=\"panel panel-primary panel-opacity\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <h3 class=\"panel-title\">{{icaiCtrl.panelTitle}}</h3>\r\n                        </div>\r\n                        <div class=\"col-md-8\">\r\n                            <div class=\"btn-group\" role=\"group\" aria-label=\"...\" style=\"float:right\">\r\n                                <button type=\"button\" class=\"btn btn-xs btn-black\" ng-click=\"icaiCtrl.changePage(-1)\">\r\n                                    <div class=\"glyphicon glyphicon-chevron-left\"></div> Anterior\r\n                                </button>\r\n                                <button type=\"button\" class=\"btn btn-xs  btn-black\" ng-click=\"icaiCtrl.changePage(1)\">\r\n                                    Siguiente\r\n                                    <div class=\"glyphicon glyphicon-chevron-right\"></div>\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <form name=\"characterizationForm\" class=\"form-horizontal\" role=\"form\" novalidate>\r\n                        <p>Bienvenido {{get_user_mail()}} </p>\r\n                        <tabset class=\"tabs-left col-sm-12\">\r\n                            <tab class=\"col-md-12\" ng-repeat=\"page in icaiCtrl.pages\" active=\"page.active\" ng-click=\"icaiCtrl.setTitle(sessions[page.key].title)\">\r\n                                <tab-heading>{{sessions[page.key].title}}\r\n                                    <!--<span ng-show=\"sessions[page.key].unAnswered<=0\" class=\"label label-success \"><p class=\"glyphicon glyphicon-ok\"></p></span>\r\n                                 <span ng-show=\"sessions[page.key].showUnaswered>0\" class=\"badge\">{{sessions[page.key].unAnswered}}</span>--></tab-heading>\r\n                                <fieldset>\r\n                                    <legend>\r\n                                        <div save-btn userid=\"user_id\" type=\"\'icai\'\" answers=\"answers\" ></div>\r\n                                        \r\n                                    </legend>\r\n                                     <ng-include src=\"\'app/InstrumentoICAI/fieldsets/\'+sessions[page.key].title+\'.html\'\" class=\"my-fade-animation\"></ng-include>\r\n                                   \r\n                                    <div class=\"col-md-offset-3 col-md-6 text-center\">\r\n                                        <br>\r\n                                        <br>\r\n                                        <div class=\"btn-group text-center\" role=\"group\">\r\n                                            <button type=\"button\" class=\"btn btn-xs  btn-black\" ng-click=\"icaiCtrl.changePage(-1)\">\r\n                                                <div class=\"glyphicon glyphicon-chevron-left\"></div> Anterior\r\n                                            </button>\r\n                                            <button type=\"button\" class=\"btn btn-xs  btn-black\" ng-click=\"icaiCtrl.changePage(1)\" ng-show=\"!isLastPage()\">\r\n                                                Siguiente\r\n                                                <div class=\"glyphicon glyphicon-chevron-right\"></div>\r\n                                            </button>\r\n                                            <button type=\"button\" class=\"btn btn-xs  btn-success\" ng-click=\"icaiCtrl.changePage(0)\" ng-show=\"isLastPage()\" modal template=\"myModalContent.html\" ng-click=\"finish()\">\r\n                                                Finalizar\r\n                                                <div class=\"glyphicon glyphicon-check\"></div>\r\n                                            </button>\r\n                                        </div>\r\n                                    </div>\r\n                                </fieldset>\r\n                                <!--        <div class=\"row\" style=\"margin-top:10px\">\r\n                                    <h4>Active pane:</h4>\r\n                                    <pre>{{icaiCtrl.tabActive()}}</pre>\r\n                                </div>-->\r\n                            </tab>\r\n                        </tabset>\r\n                    </form>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                    <div class=\"container\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-12 \">\r\n                                <!-- Default panel contents -->\r\n                                <div>Comuníquese con cualquiera de nuestros consultores a las siguientes líneas telefónicas: 301 485 1346 - 301 485 1536 - 300 265 8510 - 301 485 1421 - 301 485 1567 - 301 484 9940.</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    </div>\r\n</div>\r\n    <script type=\"text/ng-template\" id=\"myModalContent.html\">\r\n \r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">Finalizado Correctamente!</h3>\r\n    </div> <div class=\"col-md-10 col-md-offset-1\">\r\n    <div class=\"modal-body\"> \r\n    <p>Si conoce a otras empresas que puedan estar interesadas en estre proyecto, por favor indique los datos solicitados a continuación:</p>\r\n       \r\n           \r\n            <br>\r\n             <div class=\"row\" ng-repeat=\"referrer in vm.referrers\">\r\n                <label class=\"col-md-3\">Nombre:\r\n                    <input type=\"text\" value=\"referrer.nombre\" ng-model=\"referrer.nombre\" >\r\n                </label>\r\n                <label class=\"col-md-3\">Empresa:\r\n                    <input type=\"text\" value=\"referrer.empresa\" ng-model=\"referrer.empresa\">\r\n                </label class=\"col-md-3\">\r\n                <label class=\"col-md-3\">Email:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.mail\">\r\n                </label>\r\n                <label class=\"col-md-3\">Telefono:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.tel\">\r\n                </label>\r\n            </div>\r\n            <br>\r\n            <button class=\"btn btn-sm btn-info\" ng-click=\"vm.add_referrer()\">Añadir otra Empresa</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Enviar</button>\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"cancel()\">Finalizar</button>\r\n    </div>\r\n \r\n\r\n    </script>\r\n\r\n\r\n <script>\r\n    jQuery(document).ready(function($) {\r\n        var options = {};\r\n        var jssor_slider1 = new $JssorSlider$(\'slider1_container\', options);\r\n\r\n        //responsive code begin\r\n        //you can remove responsive code if you don\'t want the slider scales\r\n        //while window resizes\r\n        function ScaleSlider() {\r\n            var parentWidth = $(\'#slider1_container\').parent().width();\r\n            if (parentWidth) {\r\n                jssor_slider1.$ScaleWidth(parentWidth);\r\n            } else\r\n                window.setTimeout(ScaleSlider, 30);\r\n        }\r\n        //Scale slider after document ready\r\n        ScaleSlider();\r\n\r\n        //Scale slider while window load/resize/orientationchange.\r\n        $(window).bind(\"load\", ScaleSlider);\r\n        $(window).bind(\"resize\", ScaleSlider);\r\n        $(window).bind(\"orientationchange\", ScaleSlider);\r\n        //responsive code end\r\n    });\r\n    </script>");
$templateCache.put("app/Instrumentos/Instrumentos.html","<div class=\"wrapper col-xs-12 col-md-10 col-md-offset-1\">\r\n    <!-- Content Wrapper. Contains page content -->\r\n    <div class=\"content-wrapper \">\r\n        <!-- Content Header (Page header) -->\r\n        <section class=\"content-header\">\r\n            <h1>\r\n            Instrumentos\r\n            <small>GIE</small>\r\n          </h1>\r\n        </section>\r\n       \r\n            <!-- Main content -->\r\n            <section class=\"content\">\r\n                <!-- Info boxes -->\r\n                <div class=\"row \">\r\n                   \r\n                 <div class=\"col-lg-4 col-xs-12 \">\r\n                        <!-- small box -->\r\n                        <div class=\"small-box  bg-orange animated fadeInUp\">\r\n                            <div class=\"inner\">\r\n                                <!-- <h3>50<sup style=\"font-size: 20px\">%</sup></h3>-->\r\n                                <h3>Fase 1</h3>\r\n                                <p>Instrumento 1</p>\r\n                                <p>ICAI</p>\r\n                            </div>\r\n                            <div class=\"icon\">\r\n                                <i class=\"ion ion-ios-book-outline\"></i>\r\n                            </div>\r\n                            <a ng-href=\"#icai\" class=\"small-box-footer\">Ir al Instrumento <i class=\"ion-compose\"></i></a>\r\n                        </div>\r\n                    </div>\r\n                    <!-- ./col -->\r\n                    <div class=\"col-lg-4 col-xs-12\">\r\n                        <!-- small box -->\r\n                        <div class=\"small-box bg-orange animated fadeInUp delay3\">\r\n                            <div class=\"inner\">\r\n                                <!-- <h3>50<sup style=\"font-size: 20px\">%</sup></h3>-->\r\n                                <h3>Fase 2</h3>\r\n                                <p>Instrumento 2</p>\r\n                                <p>MiIndex</p>\r\n                            </div>\r\n                            <div class=\"icon\">\r\n                                <i class=\"ion ion-stats-bars\"></i>\r\n                            </div>\r\n                            <a ng-href=\"#imi\" class=\"small-box-footer\">Ir al Instrumento <i class=\"ion-compose\"></i></a>\r\n                        </div>\r\n                    </div>\r\n                    <!-- ./col -->\r\n                    <div class=\"col-lg-4 col-xs-12\">\r\n                        <!-- small box -->\r\n                        <div class=\"small-box bg-orange animated fadeInUp delay5 hvr-grow\">\r\n                            <div class=\"inner\">\r\n                                <h3>Fase 3</h3>\r\n                                <p>Instrumento 3</p>\r\n                                <p>ACAP</p>\r\n                            </div>\r\n                            <div class=\"icon\">\r\n                                <i class=\"ion ion-ios-settings\"></i>\r\n                            </div>\r\n                              <a ng-href=\"#acap\" class=\"small-box-footer\">Ir al Instrumento <i class=\"ion-compose\"></i></a>\r\n                        </div>\r\n                    </div>\r\n                    <!-- ./col -->\r\n                </div>\r\n                <!-- /.row -->\r\n            </section>\r\n            <!-- /.content -->\r\n        \r\n    </div>\r\n    <!-- /.content-wrapper -->\r\n</div>\r\n<!-- ./wrapper -->\r\n");
$templateCache.put("app/Password/resetPassword.html","<div class=\"container-fluid \">\r\n    <div id=\"slider1_container\" style=\"position: relative; top: 0px; left: 0px; width: 1400px; height: 200px;\">\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: 1400px; height: 200px;\">\r\n            <div><img u=\"image\" src=\"assets/images/image1.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image2.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image3.jpg\" /></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 col-md-offset-3 \">\r\n        <div ng-show=\"vm.show_expired\" class=\"text-center well\" style=\"top:10px; position:relative\">\r\n        	<h3>Esta solicitud ya expiro, por favor realice una nueva solicitud de recuperacion de contraseña en la  <a ng-href=\"#login\">pagina principal:</a></h3>\r\n        </div>\r\n            <div class=\"panel panel-primary panel-opacity\" ng-show=\"!vm.show_expired\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\">\r\n                            <h3 class=\"panel-title\">Recuperación de la cntraseña de {{vm.mail}}</h3>\r\n                        </div>\r\n \r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    <form name=\"characterizationForm\" class=\"form-horizontal\" role=\"form\" novalidate>\r\n                        <p>Ingrese su nueva contraseña y luego de clic en enviar </p>\r\n\r\n                        <fieldset>\r\n\r\n						<!-- Form Name -->\r\n						<legend>Cambiar Contraseña</legend>\r\n\r\n						<!-- Password input-->\r\n						<div class=\"form-group\">\r\n						  <label class=\"col-md-4 control-label\" for=\"passwordinput\">Nueva Contraseña</label>\r\n						  <div class=\"col-md-8\">\r\n						    <input id=\"passwordinput\" name=\"passwordinput\" type=\"password\"  class=\"form-control input-md\" ng-model=\"vm.password\">\r\n						    \r\n						  </div>\r\n						</div>\r\n\r\n						<!-- Password input-->\r\n						<div class=\"form-group\">\r\n						  <label class=\"col-md-4 control-label\" for=\"passwordinput\">Verificar Contraseña</label>\r\n						  <div class=\"col-md-8\">\r\n						    <input id=\"passwordinput\" name=\"passwordinput\" type=\"password\"  class=\"form-control input-md\" ng-model=\"vm.password_conf\">\r\n						    \r\n						  </div>\r\n						</div>\r\n						<div class=\"form-group text-center\">\r\n \r\n						  \r\n						   <button ng-click=\"vm.submit()\" type=\"button\" class=\"btn btn-info \">Enviar</button>\r\n						    \r\n						  \r\n						</div>\r\n\r\n						</fieldset>\r\n\r\n                        \r\n                    </form>\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                    <div class=\"container\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-8 \">\r\n                                <!-- Default panel contents -->\r\n                                <div>Comuníquese con cualquiera de nuestros consultores a las siguientes líneas telefónicas: 301 485 1346 - 301 485 1536 - 300 265 8510 - 301 485 1421 - 301 485 1567 - 301 484 9940.</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n <script>\r\n    jQuery(document).ready(function($) {\r\n        var options = {};\r\n        var jssor_slider1 = new $JssorSlider$(\'slider1_container\', options);\r\n\r\n        //responsive code begin\r\n        //you can remove responsive code if you don\'t want the slider scales\r\n        //while window resizes\r\n        function ScaleSlider() {\r\n            var parentWidth = $(\'#slider1_container\').parent().width();\r\n            if (parentWidth) {\r\n                jssor_slider1.$ScaleWidth(parentWidth);\r\n            } else\r\n                window.setTimeout(ScaleSlider, 30);\r\n        }\r\n        //Scale slider after document ready\r\n        ScaleSlider();\r\n\r\n        //Scale slider while window load/resize/orientationchange.\r\n        $(window).bind(\"load\", ScaleSlider);\r\n        $(window).bind(\"resize\", ScaleSlider);\r\n        $(window).bind(\"orientationchange\", ScaleSlider);\r\n        //responsive code end\r\n    });\r\n    </script>");
$templateCache.put("app/login/login.html","\n<div class=\"top-content\">\n    \n            <!-- Top content -->\n            <div class=\"inner-bg\">\n                <div class=\"container\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-12 text-center\">\n                            <h2 class=\"text-center\"><strong></strong>Implementación de un programa de gestión de la innovación empresarial para fortalecer las Pymes de sectores estratégicos en el Departamento del Atlántico</h2>\n                        </div>\n                       \n                               \n                            \n                    </div>\n                    <div class=\"row\">\n                        <div class=\"col-sm-6  col-sm-offset-3 form-box \">\n                            <div class=\"form-top sample shadow-z-2\">\n                                <div class=\"form-top-left text-center\">\n                                    <h3>Instrumento de caracterización de la actividad innovadora</div>\n                              \n                                <div class=\"form-top-left\">\n                                     <p>  <i class=\"glyphicon glyphicon-lock\"></i> Ingrese su E-mail y contraseña para ingresar</p>\n                                </div>\n                            </div>\n                            <div class=\"form-bottom sample shadow-z-2\">\n                                <form class=\"login-form\" name=\"Form\" role=\"form\" ng-submit=\"submit()\">\n                                    <div class=\"form-group\">\n                                        <label class=\"sr-only\" for=\"form-username\">E-Mail</label>\n                                        <input type=\"text\" name=\"form-username\" placeholder=\"mail@mail.com...\" class=\"form-username form-control\" id=\"form-username\" ng-model=\"user.user.email\"   validator=\"email\" email-error-message=\"Ingrese un Email valido\"  success-message=\" \">\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <label class=\"sr-only\" for=\"form-password\">Contraseña</label>\n                                        <input type=\"password\" name=\"form-password\" placeholder=\"Contraseña...\" class=\"form-password form-control\" id=\"form-password\" ng-model=\"user.user.password\"  validator=\"minlength=4\" lenght-error-message=\"Minimo 4 letras o digitos\"  email-success-message=\" \">\n                                    </div>\n                                    <button ng-click=\"ingresar(Form)\" v-busy=\"login.isBusy\" v-busy-label=\"Cargando...\" v-pressable ng-disabled=\"!Form.$valid\" class=\"btn btn-success\">Ingresar</button>\n                                    <button ng-click=\"registrar()\" v-busy=\"login.isBusy\" v-busy-label=\"Cargando...\" v-pressable ng-disabled=\"!Form.$valid\" class=\"btn btn-info\" >Registrarse</button>\n                                    \n\n                                </form>\n                                 <p class=\"h4 text-center\"><a href=\"#\" ng-click=\"passReset()\"> Recuperar contraseña </a></p>  \n                            </div>\n                        </div>\n\n                    </div>\n                            <div class=\"account col-xs-12 text-center  \">\n             <br>\n             <br>\n               \n             \n        </div>\n                    \n\n                    <div class=\"row\">\n                    <toaster-container toaster-options=\"{\'time-out\': 3000, \'close-button\':true, \'animation-class\': \'toast-top-right\'}\"></toaster-container>\n                        <!-- <div class=\"col-sm-6 col-sm-offset-3 social-login\">\n                            <h3>...O ingrese con:</h3>\n                            <div class=\"social-login-buttons\">\n                                <a class=\"btn btn-link-2\" href=\"#\">\n                                    <i class=\"fa fa-facebook\"></i> Facebook\n                                </a>\n                                <a class=\"btn btn-link-2\" href=\"#\">\n                                    <i class=\"fa fa-twitter\"></i> Twitter\n                                </a>\n                                <a class=\"btn btn-link-2\" href=\"#\">\n                                    <i class=\"fa fa-google-plus\"></i> Google Plus\n                                </a>\n                            </div>-->\n                    </div>\n                </div>\n            </div>\n        \n\n  \n</div>\n\n   ");
$templateCache.put("app/main/main.html","<div class=\"container\">\n\n \n\n  <div class=\"jumbotron text-center\">\n    <h1>\'Allo, \'Allo!</h1>\n    <p class=\"lead\">\n      <img src=\"assets/images/yeoman.png\" alt=\"I\'m Yeoman\"><br>\n      Always a pleasure scaffolding your apps.\n    </p>\n    <p class=\"animated infinite\" ng-class=\"main.classAnimation\">\n      <button type=\"button\" class=\"btn btn-lg btn-success\" ng-click=\"main.showToastr()\">Splendid Toastr</button>\n    </p>\n    <p>\n      With ♥ thanks to the contributions of<acme-malarkey extra-values=\"[\'Yeoman\', \'Gulp\', \'Angular\']\" />\n    </p>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-4\" ng-repeat=\"awesomeThing in main.awesomeThings | orderBy:\'rank\'\">\n      <div class=\"thumbnail\">\n        <img class=\"pull-right\" ng-src=\"assets/images/{{ awesomeThing.logo }}\" alt=\"{{ awesomeThing.title }}\">\n        <div class=\"caption\">\n          <h3>{{ awesomeThing.title }}</h3>\n          <p>{{ awesomeThing.description }}</p>\n          <p><a ng-href=\"{{awesomeThing.url}}\">{{ awesomeThing.url }}</a></p>\n         \n        </div>\n      </div>\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("app/results/results.html","<div class=\"container\" style=\"margin-top: 20px\">\r\n	<div class=\"col-sm-12\">\r\n            <div class=\"panel panel-primary panel-opacity\">\r\n                <div class=\"panel-heading\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-4\">\r\n                            <h3 class=\"panel-title\">Resultados</h3>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n                    \r\n                            <div class=\"table-responsive\">\r\n                                <!-- Default panel contents -->\r\n                                <table class=\"table table-bordered\">\r\n                                	\r\n                                	<thead>\r\n                                		<tr>\r\n                                			<th class=\"col-sm-1\">Usuario</th>\r\n                                			<th class=\"col-sm-1\">Nit</th>\r\n                                		\r\n                                		</tr>\r\n                                	</thead>\r\n                                	<tbody>\r\n                                		<tr ng-repeat=\"result in results | filter:result.user.created_at\">\r\n                                			<td>\r\n                                				    <a ng-click=\"showResult({{result.user.id}})\">{{result.user.email}}</a>\r\n\r\n                                			</td>\r\n                                			<td>\r\n                                				 <a ng-click=\"showResult({{result.user.id}})\">{{result.p1}}</a>\r\n                                			</td>\r\n                                		</tr>\r\n                                	</tbody>\r\n                                </table>\r\n                           	\r\n                            </div>\r\n                           \r\n                       \r\n                    \r\n\r\n                </div>\r\n                <div class=\"panel-footer\">\r\n                <a href=\"https://giepiloto.herokuapp.com/surveys/download\"><button type=\"btn btn-info\" ><i class=\"glyphicon glyphicon-cloud-download\" ></i>Descargar Excel</button></a>\r\n                </div>\r\n            </div>\r\n        \r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    \r\n		\r\n	</div>\r\n	\r\n</div>");
$templateCache.put("app/results/resultsDashboard.html","<div class=\"wrapper col-xs-12 col-md-10 col-md-offset-1\">\r\n    <!-- Content Wrapper. Contains page content -->\r\n    <div class=\"content-wrapper \">\r\n        <!-- Content Header (Page header) -->\r\n        <section class=\"content-header\">\r\n            <h1>\r\n            Instrumentos\r\n            <small>GIE</small>\r\n          </h1>\r\n        </section>\r\n       \r\n            <!-- Main content -->\r\n            <section class=\"content\">\r\n                <!-- Info boxes -->\r\n                <div class=\"row \">\r\n \r\n                 <div class=\"col-lg-4 col-xs-12 \">\r\n                        <!-- small box -->\r\n                        <div class=\"small-box  bg-orange bg-orange animated fadeInUp\">\r\n                            <div class=\"inner\">\r\n                                <!-- <h3>50<sup style=\"font-size: 20px\">%</sup></h3>-->\r\n                                <h3>Fase 1</h3>\r\n                                <p>Instrumento 1</p>\r\n                                <p>ICAI</p>\r\n                            </div>\r\n                            <div class=\"icon\">\r\n                                <i class=\"ion ion-ios-book-outline\"></i>\r\n                            </div>\r\n                            <a ng-href=\"#resultados/icai\" class=\"small-box-footer\">Ir al Instrumento <i class=\"ion-compose\"></i></a>\r\n                        </div>\r\n                    </div>\r\n                    <!-- ./col -->\r\n                    <div class=\"col-lg-4 col-xs-12\">\r\n                        <!-- small box -->\r\n                        <div class=\"small-box bg-orange  animated fadeInUp delay3\">\r\n                            <div class=\"inner\">\r\n                                <!-- <h3>50<sup style=\"font-size: 20px\">%</sup></h3>-->\r\n                                <h3>Fase 2</h3>\r\n                                <p>Instrumento 2</p>\r\n                                <p>MiIndex</p>\r\n                            </div>\r\n                            <div class=\"icon\">\r\n                                <i class=\"ion ion-stats-bars\"></i>\r\n                            </div>\r\n                            <a ng-href=\"#resultados/imi\" class=\"small-box-footer\">Ir al Instrumento <i class=\"ion-compose\"></i></a>\r\n                        </div>\r\n                    </div>\r\n                    <!-- ./col -->\r\n                    <div class=\"col-lg-4 col-xs-12\">\r\n                        <!-- small box -->\r\n                        <div class=\"small-box bg-orange animated fadeInUp delay5\">\r\n                            <div class=\"inner\">\r\n                                <h3>Fase 3</h3>\r\n                                <p>Instrumento 3</p>\r\n                                <p>AKAP</p>\r\n                            </div>\r\n                            <div class=\"icon\">\r\n                                <i class=\"ion ion-ios-settings\"></i>\r\n                            </div>\r\n                             <a ng-href=\"#resultados/acap\" class=\"small-box-footer\">Ir al Instrumento <i class=\"ion-compose\"></i></a>\r\n                        </div>\r\n                    </div>\r\n                    <!-- ./col -->\r\n               </div>\r\n                <!-- /.row -->\r\n            </section>\r\n            <!-- /.content -->\r\n        \r\n    </div>\r\n    <!-- /.content-wrapper -->\r\n</div>\r\n<!-- ./wrapper -->\r\n");
$templateCache.put("app/InstrumentoACAP/questions/acap_s1.html","<div class=\"table-responsive\">\r\n	\r\n<h4>1.	Está de acuerdo con las siguientes afirmaciones: </h4><h5><strong>1 = Nada de acuerdo; 7= Totalmente de acuerdo.</strong></h5>\r\n<table class=\"table table-striped table-hover table-condensed\">\r\n	\r\n	<thead>\r\n		<tr>\r\n			<th class=\"col-md-8\">Afirmación</th>\r\n			<th>Escala</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n		<tr> \r\n			<td>En la empresa, se le otorga tiempo a los  trabajadores para que se dediquen al desarrollo de actividades de innovación	</td>\r\n			<td><div input-scala selected-item=\"answers.s1.p1\"></div></td>\r\n\r\n		</tr>\r\n		<tr> \r\n			<td>En la empresa existe un presupuesto para el desarrollo de proyectos de innovación 	</td>\r\n			<td><div input-scala selected-item=\"answers.s1.p2\"> </td>\r\n		</tr>\r\n		<tr> \r\n			<td>La empresa hace un uso sistemático de fuentes externas de financiación, nacionales e internacionales	</td>\r\n			<td><div input-scala selected-item=\"answers.s1.p3\"></div> </td>\r\n		</tr>\r\n		<tr> \r\n			<td>Nuestro sistema de recompensa y reconocimiento apoya la innovación	</td>\r\n			<td><div input-scala selected-item=\"answers.s1.p4\"></div> </td>\r\n		</tr>\r\n	\r\n\r\n<tr>\r\n	<td>La comunicación es efectiva en todos los niveles de la empresa</td>\r\n	<td>	<div input-scala selected-item=\"answers.s1.p5\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>En nuestra empresa se promueve la conformación de equipos interdepartamentales para resolver problemas </td>\r\n	<td>	<div input-scala selected-item=\"answers.s1.p6\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Se rota frecuentemente a los empleados entre los diferentes departamentos/áreas</td>\r\n	<td>	<div input-scala selected-item=\"answers.s1.p7\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Los empleados influyen significativamente en el diseño de las políticas y la organización del trabajo</td>\r\n	<td>	<div input-scala selected-item=\"answers.s1.p8\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Los equipos de trabajo tienen autonomía para tomar decisiones</td>\r\n	<td>	<div input-scala selected-item=\"answers.s1.p9\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Existen procedimientos formalizados para el desarrollo de las actividades de gestión y/o producción</td>\r\n	<td>	<div input-scala selected-item=\"answers.s1.p10\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Se siguen de manera sistemática las normas y procedimientos establecidos</td>\r\n	<td>	<div input-scala selected-item=\"answers.s1.p11\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Existe una fuerte dependencia de las relaciones informales y se suele cooperar de forma no programada a la hora de realizar el trabajo </td>\r\n	<td>	<div input-scala selected-item=\"answers.s1.p12\"></div> </td>\r\n</tr>\r\n	\r\n\r\n\r\n<tr> \r\n	<td>El desarrollo de innovaciones en los distintos ámbitos del negocio sigue un proceso definido y se apoya en herramientas concretas 	</td>\r\n	<td><div input-scala selected-item=\"answers.s1.p13\"></div> </td>\r\n</tr>\r\n<tr> \r\n	<td>En la empresa se utilizan herramientas para identificar  nuevas oportunidades y retos de innovación </td>\r\n	<td><div input-scala selected-item=\"answers.s1.p14\"></div> </td>\r\n</tr>\r\n<tr> \r\n	<td>En la empresa se promueve la generación y búsqueda de ideas de manera sistemática	</td>\r\n	<td><div input-scala selected-item=\"answers.s1.p15\"></div> </td>\r\n</tr>\r\n<tr> \r\n	<td>Se cuenta con un sistema para escoger ideas y priorizar proyectos de innovación	</td>\r\n	<td><div input-scala selected-item=\"answers.s1.p16\"></div> </td>\r\n</tr>\r\n<tr> \r\n	<td>Nuestros proyectos de innovación usualmente se completan a tiempo y dentro del presupuesto	</td>\r\n	<td><div input-scala selected-item=\"answers.s1.p17\"></div> </td>\r\n</tr>\r\n<tr> \r\n	<td>En la empresa se sigue de manera sistemática procedimientos orientados a identificar e implementar el mecanismo de protección más adecuado para capturar el valor de las innovaciones (patentes, modelos de utilidad, marcas, secreto industrial, etc.). 	</td>\r\n	<td><div input-scala selected-item=\"answers.s1.p18\"></div> </td>\r\n</tr>\r\n\r\n	</tbody>\r\n</table>\r\n\r\n</div>");
$templateCache.put("app/InstrumentoACAP/questions/acap_s2.html","<div class=\"table-responsive\">\r\n	\r\n\r\n<table class=\"table table-striped table-hover table-condensed\">\r\n	<h4>2.	En cuanto a la captación de información. Está de acuerdo con las siguientes afirmaciones </h4><h5><strong>1 = Nada de acuerdo; 7= Totalmente de acuerdo.</strong></h5>\r\n	<thead>\r\n		<tr>\r\n			<th class=\"col-md-8\">Afirmación</th>\r\n			<th>Escala</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n		\r\n<tr> \r\n	<td>La empresa tiene y utiliza un sistema de medición concreto, en el que están claros sus distintos elementos (quién tiene la responsabilidad de medir, cómo realizar la medición, objetivos, etc.), de manera que se miden diversos indicadores de input y de output (sobre los resultados y su impacto), concretándose en lo que se puede denominar un cuadro de mando de innovación.	</td>\r\n	<td><div input-scala selected-item=\"answers.s2.p1\"></div> </td>\r\n</tr>\r\n\r\n<tr>\r\n	<td>En nuestra empresa se motiva  a los empleados a que  busquen información de fuentes pertenecientes a la industria (clientes, proveedores, competidores) </td>\r\n	<td><div input-scala selected-item=\"answers.s2.p2\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>En nuestra empresa se busca regularmente información proveniente de actores especializados (por ejemplo consultores, universidades etc.)  </td>\r\n	<td><div input-scala selected-item=\"answers.s2.p3\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>La búsqueda de información externa  relevante relacionada con el desempeño del negocio es una actividad cotidiana  </td>\r\n	<td><div input-scala selected-item=\"answers.s2.p4\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>En nuestra empresa se recoge información sobre la industria a través de canales informales (por ejemplo, comida con amigos de la industria, charlas con socios comerciales, etc.) </td> \r\n	<td><div input-scala selected-item=\"answers.s2.p5\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>En la empresa no existen mecanismos formales para la captación del conocimiento externo</td>\r\n	<td><div input-scala selected-item=\"answers.s2.p6\"></div> </td>\r\n</tr>\r\n	</tbody>\r\n</table>\r\n\r\n</div>");
$templateCache.put("app/InstrumentoACAP/questions/acap_s3.html","<div class=\"table-responsive\">\r\n	\r\n\r\n<table class=\"table table-striped table-hover table-condensed\">\r\n	<h4>3.	En cuanto a la asimilación de información. Está de acuerdo con las siguientes afirmaciones </h4>\r\n	<h5><strong>1 = Nada de acuerdo; 7= Totalmente de acuerdo.</strong></h5>\r\n	<thead>\r\n		<tr>\r\n			<th class=\"col-md-8\">Afirmación</th>\r\n			<th>Escala</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n		\r\n<tr> \r\n	<td>En nuestra empresa la información que se obtiene de fuentes externas fluye rápidamente entre los diferentes departamentos (por ejemplo, si una unidad de negocio obtiene una información relevante, ésta es comunicada apropiadamente a todos las unidades y departamentos de la empresa)</td>\r\n	<td><div input-scala selected-item=\"answers.s3.p1\"></div> </td>\r\n</tr>\r\n\r\n<tr>\r\n	<td>En nuestra empresa se promueve la discusión de la información adquirida de fuentes externas </td>\r\n	<td><div input-scala selected-item=\"answers.s3.p2\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>En nuestra empresa se alcanza un entendimiento colectivo de la información y del conocimiento que es adquirido a partir de fuentes externas </td>\r\n	<td><div input-scala selected-item=\"answers.s3.p3\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>La información y el conocimiento que se adquiere externamente se integra a la base de conocimiento de la empresa  </td>\r\n	<td><div input-scala selected-item=\"answers.s3.p4\"></div> </td>\r\n</tr>\r\n\r\n	</tbody>\r\n</table>\r\n\r\n</div>");
$templateCache.put("app/InstrumentoACAP/questions/acap_s4.html","<div class=\"table-responsive\">\r\n	\r\n\r\n<table class=\"table table-striped table-hover table-condensed\">\r\n	<h4>4.	En cuanto a la trasformación  de información. Está de acuerdo con las siguientes afirmaciones </4><h5><strong>1 = Nada de acuerdo; 7= Totalmente de acuerdo.</strong></h5>\r\n	<thead>\r\n		<tr>\r\n			<th class=\"col-md-8\">Afirmación</th>\r\n			<th>Escala</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n		\r\n<tr> \r\n	<td>Nuestros empleados tienen la capacidad de estructurar y utilizar la información y el conocimiento adquirido externamente</td>\r\n	<td><div input-scala selected-item=\"answers.s4.p1\"></div> </td>\r\n</tr>\r\n\r\n<tr>\r\n	<td>Nuestros empleados tienen la capacidad de trasformar el conocimiento adquirido externamente a partir de la base de conocimiento existente en la empresa. </td>\r\n	<td><div input-scala selected-item=\"answers.s4.p2\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Nuestros empleados son capaces de aplicar el conocimiento adquirido externamente en su trabajo práctico </td>\r\n	<td><div input-scala selected-item=\"answers.s4.p3\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Nuestros empleados tienen la capacidad de generar nuevo conocimiento a partir del conocimiento adquirido externamente   </td>\r\n	<td><div input-scala selected-item=\"answers.s4.p4\"></div> </td>\r\n</tr>\r\n\r\n	</tbody>\r\n</table>\r\n\r\n</div>");
$templateCache.put("app/InstrumentoACAP/questions/acap_s5.html","<div class=\"table-responsive\">\r\n	\r\n\r\n<table class=\"table table-striped table-hover table-condensed\">\r\n	<h4>5.	En cuanto a la explotación  de información. Está de acuerdo con las siguientes afirmaciones \r\n\r\n</h4><h5><strong>1 = Nada de acuerdo; 7= Totalmente de acuerdo.</strong></h5>\r\n	<thead>\r\n		<tr>\r\n			<th class=\"col-md-8\">Afirmación</th>\r\n			<th>Escala</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n		\r\n<tr> \r\n	<td>Nuestra empresa tiene la capacidad de convertir la información y el conocimiento adquirido externamente en innovaciones exitosas </td>\r\n	<td><div input-scala selected-item=\"answers.s5.p1\"></div> </td>\r\n</tr>\r\n\r\n<tr>\r\n	<td>Nuestra empresa tiene la habilidad de adoptar nuevas tecnologías y desarrollar procesos más eficientes </td>\r\n	<td><div input-scala selected-item=\"answers.s5.p2\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>En nuestra empresa existen mecanismos que promueven el desarrollo de prototipos de nuevos productos (bienes/servicios)</td>\r\n	<td><div input-scala selected-item=\"answers.s5.p3\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Nuestra empresa tiene problemas para utilizar la información externa en el desarrollo de nuevos productos (bienes o servicios) o procesos  </td>\r\n	<td><div input-scala selected-item=\"answers.s5.p4\"></div> </td>\r\n</tr>\r\n\r\n	</tbody>\r\n</table>\r\n\r\n</div>");
$templateCache.put("app/InstrumentoACAP/questions/acap_s6.html","<div class=\"table-responsive\">\r\n	\r\n\r\n<table class=\"table table-striped table-hover table-condensed\">\r\n	<h4>6.	Indique  con qué frecuencia se relaciona con los siguientes agentes para el desarrollo de actividades de innovación </h4><h5><strong>1 = Nada de acuerdo; 7= Totalmente de acuerdo.</strong></h5>\r\n	<thead>\r\n		<tr>\r\n			<th class=\"col-md-8\">Afirmación</th>\r\n			<th>Escala</th>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n		\r\n<tr> \r\n	<td>Otras organizaciones dentro del grupo empresarial </td>\r\n	<td><div input-scala selected-item=\"answers.s6.p1\"></div> </td>\r\n</tr>\r\n\r\n<tr>\r\n	<td>Proveedores de equipos, materiales, componentes o software </td>\r\n	<td><div input-scala selected-item=\"answers.s6.p2\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Clientes </td>\r\n	<td><div input-scala selected-item=\"answers.s6.p3\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Competidores y otras empresas de la misma industria </td>\r\n	<td><div input-scala selected-item=\"answers.s6.p4\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Consultoras </td>\r\n	<td><div input-scala selected-item=\"answers.s6.p5\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Laboratorios o empresas de I+D  </td>\r\n	<td><div input-scala selected-item=\"answers.s6.p6\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Universidades  </td>\r\n	<td><div input-scala selected-item=\"answers.s6.p7\"></div> </td>\r\n</tr>\r\n<tr>\r\n	<td>Agencias gubernamentales / Institutos de investigación sin fines de lucro  </td>\r\n	<td><div input-scala selected-item=\"answers.s6.p8\"></div> </td>\r\n</tr>\r\n\r\n\r\n	</tbody>\r\n</table>\r\n\r\n</div>");
$templateCache.put("app/InstrumentoIMI/questions/imi_s1.html","<label class=\"col-xs-12 \">\r\n    <p>Para cada una de las siguientes afirmaciones, Indique en las siguientes escalas el grado de acuerdo. <span style=\"color:red; font-weight: 100\"></span></p>\r\n</label>\r\n<div class=\"col-xs-12\" >\r\n    <table class=\"table  table-bordered\">\r\n        <thead>\r\n            <tr>\r\n                <th class=\"col-xs-6 col-sm-6 col-md-5\">\r\n                    <p>Actividad </p>\r\n                </th>\r\n                <th class=\"col-xs-6 col-sm-6 col-md-7\">\r\n                    <p>Grado de acuerdo</p>\r\n                </th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td>Los trabajadores tienen una idea clara de como la innovación nos ayuda a competir</td>\r\n                <td class=\"text-center col-xs-6\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p1\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                    \r\n                </td>\r\n               \r\n            </tr>\r\n            <tr>\r\n                <td>Tenemos procesos claros que nos ayudan a gestionar el desarrollo de nuevos productos desde la idea hasta el lanzamiento</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p2\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                     \r\n                     </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Tenemos una relación ganar-ganar con nuestros proveedores</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p3\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Los trabajadores trabajan bien en equipo sin importar áreas o departamentos</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p4\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Los clientes conocen nuestra propuesta de valor</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p5\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Trabajamos bien con otras instituciones de educación superior o centros de investigación</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p6\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Nuestra estructura permite la toma de decisiones de manera rápida y efectiva</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p7\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Co-creamos con nuestros clientes para explorar y desarrollar nuevos conceptos</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p8\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Hacemos comparaciones sistemáticas de nuestros productos con otros competidores</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p9\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n\r\n            <tr>\r\n                <td>Buscamos ideas de manera sistemática</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p10\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>La comunicación es efectiva en todos los niveles de la empresa</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p11\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Colaboramos con otras empresas para desarrollar nuevos productos o procesos</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p12\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Compartimos experiencias con otras empresas que nos ayudan en el proceso de aprendizaje</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p13\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n                        <tr>\r\n                <td>Hay un gran compromiso en la dirección para incentivar la innovación</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p14\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Contamos con mecanismos para garantizar la participación temprana de todos los departamentos en el desarrollo de nuevos productos y procesos</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p15\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Nuestro sistema de recompensa y reconocimiento apoya la innovación</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p16\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Somos buenos en la captura de lo que hemos aprendido y en la transferencia de este conocimiento a todos los trabajadores de la empresa</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p17\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Tenemos un sistema para escoger proyectos de innovación</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p18\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Existe un claro vínculo entre los proyectos de innovación que desarrollamos y la estrategia global de la empresa</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p19\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Utilizamos la medición para ayudar a identificar dónde y cuándo podemos mejorar nuestra gestión de la innovación</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s1.p20\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n\r\n        </tbody>\r\n    </table>\r\n\r\n\r\n");
$templateCache.put("app/InstrumentoICAI/fieldsets/Actividad Relacional.html","<label class=\"col-md-12 \">\r\n    <p>25. Señale el grado de importancia que tuvieron las siguientes fuentes de información para la actividad innovadora en su empresa. <span style=\"color:red; font-weight: 100\">(Nota: Si la fuente de información no fue utilizada al momento de realizar sus innovaciones, no conteste las siguientes preguntas)</span></p>\r\n</label>\r\n<div class=\"col-md-12\">\r\n    <table class=\"table  table-bordered\">\r\n        <thead>\r\n            <tr>\r\n                <th class=\"col-md-5\">\r\n                    <p>Fuentes de información\r\n                    </p>\r\n                </th>\r\n                <th>\r\n                    <p>Grado de importancia</p>\r\n                </th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td>Fuentes internas (generados al interior de la empresa)</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p1\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Proveedores</td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p2\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Clientes</td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p3\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Competidores u otras empresas del mismo sector</td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p4\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Consultores, laboratorios comerciales</td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p5\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Universidades u otras instituciones de educación superior </td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p6\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Institutos de investigación públicos </td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p7\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Agremiaciones y/o asociaciones sectoriales</td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p8\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Conferencias, ferias y exposiciones</td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p9\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Revistas científicas, base de datos de patentes </td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p10\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Asociaciones a nivel profesional e industrial</td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p11\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Internet</td>\r\n                <td>\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s11.p12\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                        </slider>\r\n                       \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n    <br>\r\n    <label class=\"col-md-12\">\r\n        <p>26. Señale el grado de importancia de los siguientes socios de <a   tooltip-placement=\"top\" tooltip=\"Se entiende por cooperación en innovación la participación activa con otras empresas o entidades no comerciales en proyectos conjuntos de innovación. No implica que que las dos partes obtengan beneficios económicos de la cooperación. Se excluye la simple contratación de servicios o trabajos de otra organización sin participación activa. \" tooltip-class=\"customClass\">cooperación  <i class=\"glyphicon glyphicon-info-sign\"></i></a>  utilizados para llevar a cabo actividades de ciencia, tecnología e innovación durante el periodo 2013 - 2014 <span style=\"color:red; font-weight: 100\">(Nota: Si no hubo cooperación con el socio al momento de realizar sus innovaciones, no conteste las siguientes preguntas)</span></p>\r\n    </label>\r\n    <div class=\" col-md-offset-2 col-md-8\">\r\n        <table class=\"table  table-bordered\">\r\n            <thead>\r\n                <tr>\r\n                    <th>\r\n                        <p>Socio de cooperación </p>\r\n                    </th>\r\n                    <th class=\"col-sm-8\">\r\n                        <p>Grado de importancia </p>\r\n                    </th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Otras empresas de su mismo grupo</p>\r\n                        \r\n                    </td><td colspan=\"\" rowspan=\"\" headers=\"\"> <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p13\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div></td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Proveedores</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p14\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                        </td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Clientes</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p15\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Competidores</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p16\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                        </td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Consultores</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p17\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Universidades</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p18\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Centros de Desarrollo Tecnológico</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p19\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Centros de Investigación</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p20\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Parques Tecnológicos</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p21\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                    </td>\r\n\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Centros Regionales de Productividad</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p22\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    \r\n                    <td>\r\n                        <p>Organizaciones Internacionales</p>\r\n                    </td>\r\n                    <td>\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s11.p23\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                           \r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n        <!-- Text input\r\n        <div class=\"form-group\">\r\n            <label class=\"col-md-3 control-label\">Otros</label>\r\n            <div class=\"col-md-1\">\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s11.check\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"properties.s11.check\">\r\n                </td>\r\n               \r\n\r\n            </div> \r\n            <div >\r\n                    <label class=\"col-md-2 control-label\">Cuáles?</label>\r\n                    <p class=\"input-group col-md-6\">\r\n                        <input value= \"\" type=\"text\" class=\"form-control input-xs\" ng-model=\"answers.s11.p24\" />\r\n                    </p>\r\n                </div>\r\n        </div>\r\n-->");
$templateCache.put("app/InstrumentoICAI/fieldsets/Actividades de Innovación.html"," \r\n    \r\n    <label class=\"col-sm-12 \">\r\n        <p>21. Indique si ha invertido en alguna de las siguientes actividades de innovación durante el periodo 2013-2014, anotando las respectivas fuentes de financiación utilizadas</p>\r\n    </label>\r\n    <div class=\"col-sm-12 \">\r\n    <div class=\"table-responsive\">\r\n        <table class=\"table table-striped table-bordered table-responsive\">\r\n            <thead>\r\n                <tr>\r\n                    <th >\r\n                        <p>Actividad </p>\r\n                    </th>\r\n                    <th  class=\"col-2-sm\">\r\n                        <p>Recursos Propios </p>\r\n                    </th>\r\n                    <th  class=\"col-2-sm\">\r\n                        <p>Banca Privada </p>\r\n                    </th>\r\n                    <th class=\"col-2-sm\">\r\n                        <p>Banca Pública</p>\r\n                    </th>\r\n                    <th class=\"col-2-sm\">\r\n                        <p>Otros Recursos</p>\r\n                    </th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Trabajos de creación sistemáticos llevados a cabo dentro de la empresa con el fin de aumentar el volumen de conocimientos y su utilización para idear bienes, servicios, o procesos nuevos o mejorados\" tooltip-class=\"customClass\">Actividades de I+D Internas <p class=\"glyphicon glyphicon-info-sign\"></p></a> </td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p11\" name=\"answers.s8.s11\" ></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p12\" name=\"answers.s8.s12\" ></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p13\" name=\"answers.s8.s13\" ></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p14\" name=\"answers.s8.s14\" ></td>\r\n                    \r\n                </tr>\r\n \r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Adquisición o financiación de las mismas actividades que las arriba indicadas (I+D) pero realizadas por otras organizaciones públicas o privadas (incluye organismos de investigación)\" tooltip-class=\"customClass\">Adquisición de I+D (externa)   <p class=\"glyphicon glyphicon-info-sign\"></p></a></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p21\" name=\"answers.s8.s21\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p22\" name=\"answers.s8.s22\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p23\" name=\"answers.s8.s23\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p24\" name=\"answers.s8.s24\"></td>\r\n                \r\n                    \r\n\r\n\r\n                </tr>\r\n             \r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Maquinaria y equipo, específicamente comprado para la producción o implementación de bienes, servicios o procesos nuevos o significativamente mejorados (No incluir aquellos registrados en I+D, item 1)\" tooltip-class=\"customClass\">Adquisición de maquinaria y equipo <p class=\"glyphicon glyphicon-info-sign\"></p> </a> </td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p31\" name=\"answers.s8.s31\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p32\" name=\"answers.s8.s32\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p33\" name=\"answers.s8.s33\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p34\" name=\"answers.s8.s34\" ng-click=\"\"></td>\r\n                    \r\n\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Adquisición, generación, outsourcing o arriendo de elementos de hardware, software y/o servicios para el manejo o procesamiento de la información, específicamente destinados a la producción o implementación de bienes, servicios o procesos nuevos o significativamente mejorados\" tooltip-class=\"customClass\">Tecnologías de información y telecomunicaciones   <p class=\"glyphicon glyphicon-info-sign\"></p></a></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p41\" name=\"answers.s8.s41\" ng-click=\"answers.s8.s4\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p42\" name=\"answers.s8.s42\" ng-click=\"answers.s8.s4\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p43\" name=\"answers.s8.s43\" ng-click=\"answers.s8.s4\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p44\" name=\"answers.s8.s44\" ng-click=\"answers.s8.s4\"></td>\r\n                    \r\n\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Actividades de introducción en el mercado de bienes o servicios nuevos o significativamente mejorados, incluye investigación de mercado y publicidad de lanzamiento \" tooltip-class=\"customClass\">Mercadeo de innovaciones   <p class=\"glyphicon glyphicon-info-sign\"></p></a></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p51\" name=\"answers.s8.s51\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p52\" name=\"answers.s8.s52\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p53\" name=\"answers.s8.s53\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p54\" name=\"answers.s8.s54\" ng-click=\"\"></td>\r\n                    \r\n\r\n                </tr>\r\n                \r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Adquisición o uso bajo licencia, de patentes u otros registros de propiedad intelectual, de inventos no patentados y conocimientos técnicos o de otro tipo; de otras empresas u organizaciones para utilizar en las innovaciones de su empresa \" tooltip-class=\"customClass\">Transferencia de tecnología  <p class=\"glyphicon glyphicon-info-sign\"></p></a></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p61\" name=\"answers.s8.s61\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p62\" name=\"answers.s8.s62\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p63\" name=\"answers.s8.s63\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p64\" name=\"answers.s8.s64\" ng-click=\"\"></td>\r\n                     \r\n\r\n                </tr>\r\n         \r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Asesorías para la utilización de conocimientos tecnológicos aplicados, por medio del ejercicio de un arte o técnica, específicamente contratadas para la producción o implementación de bienes, servicios o procesos nuevos o significativamente mejorados. Incluye inteligencia de mercados y vigilancia tecnológica\" tooltip-class=\"customClass\">Asistencia técnica y consultoría  <p class=\"glyphicon glyphicon-info-sign\"></p></a> </td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p71\" name=\"answers.s8.s71\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p72\" name=\"answers.s8.s72\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p73\" name=\"answers.s8.s73\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p74\" name=\"answers.s8.s74\" ng-click=\"\"></td>\r\n                     \r\n\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Cambios en los métodos o patrones de producción y control de calidad, y elaboración de planos y diseños orientados a definir procedimientos técnicos, necesarios para la producción o implementación de bienes, servicios o procesos nuevos o significativamente mejorados en la empresa\" tooltip-class=\"customClass\">Ingeniería y diseño industrial <p class=\"glyphicon glyphicon-info-sign\"></p></a></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p81\" name=\"answers.s8.s81\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p82\" name=\"answers.s8.s82\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p83\" name=\"answers.s8.s83\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p84\" name=\"answers.s8.s84\" ng-click=\"\"></td>\r\n                    \r\n\r\n                </tr>\r\n\r\n                <tr>\r\n                    <td class=\"underlined\"><a href=\"#\"  tooltip-placement=\"right\" tooltip=\"Formación a nivel de maestría y doctorado, y capacitación que involucra un grado de complejidad significativo (requiere de un personal capacitador altamente especializado). Se incluye la realizada mediante financiación con recursos de la empresa y la impartida directamente dentro de la empresa. \" tooltip-class=\"customClass\">Formación y capacitación especializada <p class=\"glyphicon glyphicon-info-sign\"></p></a> </td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p91\" name=\"answers.s8.s91\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p92\" name=\"answers.s8.s92\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p93\" name=\"answers.s8.s93\" ng-click=\"\"></td>\r\n                    <td class=\"text-center col-sm-2\"><input type=\"checkbox\" ng-model=\"answers.s8.p94\" name=\"answers.s8.s94\" ng-click=\"\"></td>\r\n                    \r\n\r\n                </tr>\r\n\r\n            </tbody>\r\n        </table>\r\n        </div>\r\n        <!-- Multiple Radios (inline) -->\r\n       \r\n        <div class=\"form-group\">\r\n            <label class=\"col-md-12 \">22. ¿Su empresa cuenta con Departamento de I+D? </label>\r\n            <div class=\"col-md-12\">\r\n                <label class=\"radio-inline\" for=\"answers.s8.p101\">\r\n                    <input name=\"answers.s8.p10\" type=\"radio\" value=\"1\" ng-model=\"answers.s8.p10\"> Si\r\n                </label>\r\n                <label class=\"radio-inline\" for=\"answers.s8.p102\">\r\n                    <input name=\"answers.s8.p10\" type=\"radio\" value=\"0\" ng-model=\"answers.s8.p10\"> No\r\n                </label>\r\n            </div>\r\n        </div>\r\n \r\n");
$templateCache.put("app/InstrumentoICAI/fieldsets/Características Básicas de la Empresa.html","<!-- Appended Input-->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"appendedtext\">10. ¿Cuál de estos sectores (CIIU Rev. 4) representa principalmente la actividad económica principal de su empresa?</label>\r\n    <div class=\"col-md-5\">\r\n        <div class=\"input-group\">\r\n            <input name=\"appendedtext\" class=\"form-control input-xs\" id=\"appendedtext\" required=\"\" type=\"text\" ng-model=\"answers.s3.p1\">\r\n            <ciiuv-modal-btn class=\"input-group-addon input-xs\"></ciiuv-modal-btn>\r\n        </div>\r\n    </div>\r\n</div>\r\n<!-- Text input-->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"bsEmpresa.monto\">11. Monto de ventas nacionales (miles de pesos corrientes) en el año 2014</label>\r\n    <div class=\"col-md-4\">\r\n        <input name=\"bsEmpresa.monto\" class=\"form-control input-xs\" id=\"bsEmpresa.monto\" required=\"\" type=\"text\" placeholder=\"\" ng-model=\"answers.s3.p2\"  validator=\"number\" number-error-message=\"Debe ser númerico\"  success-message=\" \">\r\n    </div>\r\n</div>\r\n<!-- Multiple Radios (inline) -->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"bsEmpresa.ventas\">12. En los últimos tres años las ventas de su empresa han:</label>\r\n    <div class=\"col-md-8\">\r\n        <label class=\"radio-inline\" for=\"bsEmpresa.ventas-0\">\r\n            <input name=\"bsEmpresa.ventas\" id=\"bsEmpresa.ventas-0\" type=\"radio\" checked=\"checked\" value=\"Aumentado\" ng-model=\"answers.s3.p3\"> Aumentado\r\n        </label>\r\n        <label class=\"radio-inline\" for=\"bsEmpresa.ventas-1\">\r\n            <input name=\"bsEmpresa.ventas\" id=\"bsEmpresa.ventas-1\" type=\"radio\" value=\"Disminuido\" ng-model=\"answers.s3.p3\"> Disminuido\r\n        </label>\r\n        <label class=\"radio-inline\" for=\"bsEmpresa.ventas-2\">\r\n            <input name=\"bsEmpresa.ventas\" id=\"bsEmpresa.ventas-2\" type=\"radio\" value=\"Se han mantenido constantes\" ng-model=\"answers.s3.p3\">Se han mantenido constantes\r\n        </label>\r\n    </div>\r\n</div>\r\n<!-- Multiple Radios (inline) -->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"bsEmpresa.exportacion\">13. ¿Su empresa ha exportado en los últimos 2 años? </label>\r\n    <div class=\"col-md-8\">\r\n        <label class=\"radio-inline\" for=\"bsEmpresa.exportacion-0\">\r\n            <input name=\"bsEmpresa.exportacion\" id=\"bsEmpresa.exportacion-0\" type=\"radio\" checked=\"checked\" value=\"1\" ng-model=\"answers.s3.p4\"> Si\r\n        </label>\r\n        <label class=\"radio-inline\" for=\"bsEmpresa.exportacion-1\">\r\n            <input name=\"bsEmpresa.exportacion\" id=\"bsEmpresa.exportacion-1\" type=\"radio\" value=\"0\" ng-model=\"answers.s3.p4\"> No\r\n        </label>\r\n    </div>\r\n</div>\r\n<!-- Text input-->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"bs.Empresa.Importancia\">14. Ordene en importancia el mercado geográfico de las ventas de bienes o servicios de su empresa </label>\r\n    <div class=\"col-md-6\">\r\n        <div class=\"btn-group\">\r\n            <label class=\"btn btn-info btn-sm\" ng-model=\"opc.elem\" btn-checkbox ng-click=\"order.setOrdersRes($index)\" ng-repeat=\"opc in order.check\">{{opc.text}} </label>\r\n        </div>\r\n        <span class=\"help-block\" style=\"color:green\">{{order.message}}</span>\r\n    </div>\r\n</div>\r\n<!-- Text input-->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"bsEmpresa.empleados\">15. Número de empleados (promedio anual) del año 2014 (incluyendo empleados con contrato laboral y de prestación de servicio)</label>\r\n    <div class=\"col-md-2\">\r\n        <input name=\"bsEmpresa.empleados\" class=\"form-control input-xs\" id=\"bsEmpresa.empleados\" required=\"\" type=\"text\" placeholder=\" \" ng-model=\"answers.s3.p6\"  validator=\"number\" number-error-message=\"Debe ser númerico\"  success-message=\" \">\r\n        <span class=\"help-block\"> </span>\r\n    </div>\r\n</div>\r\n<!-- Text input-->\r\n<!--<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"bsEmpresa.empleadosCont\">\r\n        <!--Número de empleados con contrato civil de prestación de servicios\r\n    </label>\r\n    <div class=\"col-md-2\">\r\n        <input name=\"bsEmpresa.empleadosCont\" class=\"form-control input-xs\" id=\"bsEmpresa.empleadosCont\" type=\"hidden\" placeholder=\"\" ng-model=\"answers.s3.p7\">\r\n    </div>\r\n</div>-->\r\n");
$templateCache.put("app/InstrumentoICAI/fieldsets/Datos del Informante.html","\r\n						<div class=\"form-group\">\r\n							<label class=\"col-md-4 control-label\" for=\"informante.name\">5. Nombre</label>\r\n							<div class=\"col-md-4\">\r\n								<input name=\"informante.name\" class=\"form-control input-xs\" id=\"informante.name\" required=\"\" type=\"text\" placeholder=\"\"  ng-model=\"answers.s2.p1\">\r\n								\r\n							</div>\r\n						</div>\r\n						<!-- Select Basic -->\r\n						<div class=\"form-group\">\r\n							<label class=\"col-md-4 control-label\" for=\"informante.nivel\">6. Nivel educativo máximo alcanzado</label>\r\n							<div class=\"col-md-4\">\r\n								<select name=\"informante.nivel\" class=\"form-control input-xs\" id=\"informante.nivel\"  ng-model=\"answers.s2.p2\">\r\n									<option value=\"Básica primaria\">Básica primaria</option>\r\n									<option value=\"Básica secundaria\">Básica secundaria</option>\r\n									<option value=\"Técnica profesional\">Técnica profesional</option>\r\n									<option value=\"Tecnológica\">Tecnológica</option>\r\n									<option value=\"Profesional Universitario\">Profesional Universitario</option>\r\n									<option value=\"Especialización\">Especialización</option>\r\n									<option value=\"Maestría\">Maestría</option>\r\n									<option value=\"Doctorado\">Doctorado</option>\r\n								</select>\r\n							</div>\r\n						</div>\r\n						<!-- Text input-->\r\n						<div class=\"form-group\">\r\n							<label class=\"col-md-4 control-label\" for=\"informante.cargo\">7. Cargo</label>\r\n							<div class=\"col-md-4\">\r\n								<input name=\"informante.cargo\" class=\"form-control input-xs\" id=\"informante.cargo\" required=\"\" type=\"text\" placeholder=\"\"  ng-model=\"answers.s2.p3\">\r\n								\r\n							</div>\r\n						</div>\r\n						<!-- Text input-->\r\n						<div class=\"form-group\">\r\n							<label class=\"col-md-4 control-label\" for=\"informante.telefono\">8. Telefono</label>\r\n							<div class=\"col-md-4\">\r\n								<input name=\"informante.telefono\" class=\"form-control input-xs\" id=\"informante.telefono\" type=\"text\" placeholder=\"\"  ng-model=\"answers.s2.p4\">\r\n								 \r\n							</div>\r\n						</div>\r\n						<!-- Text input-->\r\n						<div class=\"form-group\">\r\n							<label class=\"col-md-4 control-label\" for=\"informante.email\">9. E-mail</label>\r\n							<div class=\"col-md-4\">\r\n								<input name=\"informante.email\" class=\"form-control input-xs\" id=\"informante.email\" required=\"\" type=\"text\" placeholder=\" \"  ng-model=\"answers.s2.p5\">\r\n								<span class=\"help-block\"> </span>\r\n							</div>\r\n						</div>\r\n");
$templateCache.put("app/InstrumentoICAI/fieldsets/Identificación de la Empresa.html","<!-- Text input-->\r\n<!-- Text input-->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"p1\">Nombre de la Empresa</label>\r\n    <div class=\"col-md-4\">\r\n        <input name=\"nombre_emp\" class=\"form-control input-xs\" type=\"text\" ng-model=\"answers.s11.p25\" required>\r\n    </div>\r\n</div>\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"p1\">1. Número de Identificación Tributaria</label>\r\n    <div class=\"col-md-4\">\r\n        <input name=\"p1\" class=\"form-control input-xs\" type=\"text\" ng-model=\"answers.s1.p1\" required>\r\n    </div>\r\n</div>\r\n\r\n<!-- Text input-->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"anoFundacion\">2. Año de fundación de la empresa (Año de inicio de actividades productivas)</label>\r\n    <div class=\"col-md-4\">\r\n        <p class=\"input-group\">\r\n            <input type=\"text\" class=\"form-control input-xs\" ng-model=\"answers.s1.p2\" datepicker-popup=\"dd-MM-yyyy\" is-open=\"icaiCtrl.status.opened\" max-date=\"\'icaiCtrl.today\'\" ng-required=\"true\" close-text=\"Close\" />\r\n            <span class=\"input-group-btn\">\r\n                <button type=\"button\" class=\"btn btn-default btn-xs\" ng-click=\"icaiCtrl.open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\r\n            </span>\r\n        </p>\r\n    </div>\r\n</div>\r\n<!-- Multiple Radios (inline) -->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"familiar_chk\">3. ¿Es una empresa familiar?</label>\r\n    <div class=\"col-md-4\">\r\n        <label class=\"radio-inline\" for=\"familiar_chk-0\">\r\n            <input name=\"familiar_chk\" id=\"familiar_chk-0\" type=\"radio\" checked=\"checked\" value=\"1\" ng-model=\"answers.s1.p3\"> Si\r\n        </label>\r\n        <label class=\"radio-inline\" for=\"familiar_chk-1\">\r\n            <input name=\"familiar_chk\" id=\"familiar_chk-1\" type=\"radio\" value=\"0\" ng-model=\"answers.s1.p3\"> No\r\n        </label>\r\n    </div>\r\n</div>\r\n<!-- Select Basic -->\r\n<div class=\"form-group\">\r\n    <label class=\"col-md-4 control-label\" for=\"nivelFormacion\">4. Nivel de formación del gerente</label>\r\n    <div class=\"col-md-4\">\r\n        <select name=\"nivelFormacion\" class=\"form-control input-xs\" id=\"nivelFormacion\" ng-model=\"answers.s1.p4\">\r\n            <option value=\"Básica primaria\">Básica primaria</option>\r\n            <option value=\"Básica secundaria\">Básica secundaria</option>\r\n            <option value=\"Técnica profesional\">Técnica profesional</option>\r\n            <option value=\"Tecnológica\">Tecnológica</option>\r\n            <option value=\"Profesional Universitario\">Profesional Universitario</option>\r\n            <option value=\"Especialización\">Especialización</option>\r\n            <option value=\"Maestría\">Maestría</option>\r\n            <option value=\"Doctorado\">Doctorado</option>\r\n        </select>\r\n    </div>\r\n</div>\r\n");
$templateCache.put("app/InstrumentoICAI/fieldsets/Innovación Organizacional.html"," \r\n    <label class=\"col-md-12 \" ><p>19. Durante el periodo 2013 - 2014 su empresa introdujo:</p></label>\r\n    \r\n    <div class=\"col-md-12\">\r\n        \r\n    \r\n    <table class=\"table table-striped table-bordered\">\r\n        <thead>\r\n            <tr>\r\n                <th  class=\"col-md-9\"><p></p></th>\r\n                <th><p>Si</p> </th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td  ><b>Nuevas prácticas en la organización del trabajo o procedimientos de la empresa </b>\r\n<div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \'Gestión de la cadena de suministro, sistemas de gestión del conocimiento, reingeniería de negocios, producción eficiente, sistemas de educación y formación…\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div></td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s6.p1\" id=\"innovacion.producto.nuevos-0\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s6.p1\">\r\n                </td>\r\n                \r\n            </tr>\r\n            <tr>\r\n                <td ><b>Nuevos métodos de organizar los lugares de trabajo para mejorar el reparto de responsabilidades y la toma de decisiones </b>\r\n                <div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \'Uso por primera vez de un nuevo sistema de reparto de responsabilidades entre los empleados, gestión de equipos de trabajo, descentralización, reestructuración de departamentos…\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div></td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s6.p2\" id=\"innovacion.producto.nuevos-0\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s6.p2\">\r\n                </td>\r\n                \r\n            </tr>\r\n            <tr>\r\n                <td ><b>Nuevos métodos de gestión de relaciones externas con otras empresas o instituciones públicas</b> \r\n                <div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \'La creación por primera vez de alianzas, asociaciones, externalización o subcontratación\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div></td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s6.p3\" id=\"innovacion.producto.nuevos-0\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s6.p3\">\r\n                </td>\r\n                \r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n    </div>\r\n ");
$templateCache.put("app/InstrumentoICAI/fieldsets/Innovación de Producto.html","     \r\n        <label class=\"col-md-12 \" ><p>16. Durante el periodo 2013 - 2014 su empresa introdujo:</p></label>\r\n        \r\n        <div class=\"col-md-offset-2 col-md-8\">\r\n        	\r\n        \r\n        <table class=\"table table-striped table-bordered\">\r\n            <thead>\r\n                <tr>\r\n                    <th class=\"col-md-9\"><p></p></th>\r\n                    <th><p>Si</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr>\r\n                    <td>Bienes nuevos</td>\r\n                     <td class=\"text-center\">\r\n                        <input name=\"answers.s4.p1\"  type=\"checkbox\" checked=\"1\" value=\"1\" ng-model=\"answers.s4.p1\">\r\n                    </td>\r\n                   \r\n                </tr>\r\n                <tr>\r\n                    <td>Bienes significativamente mejorados</td>\r\n                     <td class=\"text-center\">\r\n                        <input name=\"answers.s4.p2\"  type=\"checkbox\" checked=\"1\" value=\"1\" ng-model=\"answers.s4.p2\">\r\n                    </td>\r\n               \r\n                </tr>\r\n                <tr>\r\n                    <td>Servicios nuevos</td>\r\n                    <td class=\"text-center\">\r\n                        <input name=\"answers.s4.p3\"  type=\"checkbox\" checked=\"1\" value=\"1\" ng-model=\"answers.s4.p3\">\r\n                    </td>\r\n\r\n                   \r\n                </tr>\r\n\r\n\r\n            </tbody>\r\n        </table>\r\n        <br>\r\n        <br>\r\n\r\n        </div>\r\n            <div class=\"form-group\">\r\n            <label class=\"col-md-12 \"> 17. Durante el periodo 2013 - 2014 tuvo su negocio alguna actividad de innovación en estado: </label>\r\n            <div class=\"col-md-12\">\r\n                <label class=\"radio-inline\" for=\"answers.s7.p51\">\r\n                    <input name=\"answers.s4.p41\" type=\"checkbox\"  value=\"1\"  ng-model=\"answers.s4.p41\" >\r\n                    Abandonada\r\n                </label>\r\n                <label class=\"radio-inline\" for=\"answers.s7.p52\">\r\n                    <input name=\"answers.s4.p42\" type=\"checkbox\" value=\"1\" ng-model=\"answers.s4.p42\">\r\n                    Aún en marcha al final del año 2014\r\n                </label>\r\n            </div>\r\n             <input type=\"hidden\" name=\"\" value=\"\" ng-model=\"answers.s4.p4\">\r\n           \r\n        </div>\r\n            <br>\r\n        <br>");
$templateCache.put("app/InstrumentoICAI/fieldsets/Innovación en Marketing.html"," \r\n    <label class=\"col-md-12 \" ><p>20. Durante el periodo 2013 - 2014 su empresa introdujo:</p></label>\r\n    \r\n    <div class=\"col-md-12\">\r\n    	\r\n    \r\n    <table class=\"table table-striped table-bordered\">\r\n        <thead>\r\n            <tr>\r\n                <th  class=\"col-md-9\"><p></p></th>\r\n                <th><p>Si</p> </th>\r\n\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td  ><b>Cambios significativos en el diseño, envase y embalaje de bienes y servicios.</b>\r\n                <div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \'Se excluyen los cambios que alteran la funcionalidad o características de uso del producto\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div> </td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s7.p1\"  type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s7.p1\">\r\n                </td>\r\n                            </tr>\r\n            <tr>\r\n                <td ><b>Nuevos medios o técnicas para la promoción del producto </b><div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \'Por ejemplo: Uso por primera vez de un nuevo canal publicitario, fundamentalmente marcas nuevas con el objetivo de introducirse en nuevos mercados, introducción de tarjetas de fidelización de clientes…\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div> </td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s7.p2\"  type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s7.p2\">\r\n                </td>\r\n               \r\n            </tr>\r\n            <tr>\r\n                <td ><b>Nuevos métodos o canales de venta para el posicionamiento del producto en el mercado </b>\r\n                <div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \'El uso por primera vez de franquiciado o licencias de distribución, venta directa, venta al por menor en exclusiva, nuevos conceptos para la presentación del producto…\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div> </td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s7.p3\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s7.p3\">\r\n                </td>\r\n               \r\n            </tr>\r\n             <tr>\r\n                <td ><b>Nuevos métodos de fijación de precios de los bienes y servicios </b> </td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s7.p4\" id=\"innovacion.producheckboxcto.nuevos-0\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s7.p4\">\r\n                </td>\r\n                            </tr>\r\n        </tbody>\r\n    </table>\r\n		<!-- Multiple Radios (inline) -->\r\n\r\n    </div>\r\n \r\n");
$templateCache.put("app/InstrumentoICAI/fieldsets/Innovación en Procesos.html"," \r\n    <label class=\"col-md-12 \" ><p>18. Durante el periodo 2013 - 2014 su empresa introdujo:</p></label>\r\n    \r\n    <div class=\"col-md-12\">\r\n        \r\n    \r\n    <table class=\"table table-striped table-bordered\">\r\n        <thead>\r\n            <tr>\r\n                <th class=\"col-md-9\"><p></p></th>\r\n                <th><p>Si</p> </th>\r\n   \r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n<tr>\r\n    <td><b>Un nuevo método de manufactura o de producción de bienes y servicios</b>\r\n        <div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \' Automatización de procesos manuales, sistemas de envasado automático, instalación de un diseño asistido por ordenador para el desarrollo de un producto…\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div>\r\n        <script>\r\n        ;\r\n        </script>\r\n    </td>\r\n    <td class=\"text-center\">\r\n        <input name=\"answers.s5.p1\" id=\"innovacion.producto.nuevos-0\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s5.p1\">\r\n    </td>\r\n</tr>\r\n\r\n            <tr>\r\n                <td><b>Un nuevo método de logística, entrega o distribución para sus insumos, bienes o servicios</b>\r\n                        <div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \'Sistemas de pedidos, sistemas de minimización de stocks, sistemas logísticos de transporte…\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div> </td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s5.p2\" id=\"innovacion.producto.nuevos-0\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s5.p2\">\r\n                </td>\r\n                \r\n            </tr>\r\n            <tr>\r\n                <td><b>Una nueva actividad de apoyo para sus procesos, tales como sistema de mantenimiento u operaciones de compra, contabilidad o informática</b>\r\n                 <div class=\"label btn-xs label\" ng-click=\"swal(\'Por Ejemplo:\', \'Sistemas de información y gestión, sistemas de gestión de contabilidad, sistemas tipo SAP…\')\"><i class=\" glyphicon glyphicon-plus-sign\"></i> Ejemplo</div> </td>\r\n                <td class=\"text-center\">\r\n                    <input name=\"answers.s5.p3\" id=\"innovacion.producto.nuevos-0\" type=\"checkbox\" checked=\"true\" value=\"1\" ng-model=\"answers.s5.p3\">\r\n                </td>\r\n                \r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n\r\n\r\n    </div>\r\n ");
$templateCache.put("app/InstrumentoICAI/fieldsets/Objetivos y Efectos.html","<label class=\"col-xs-12 \">\r\n    <p>23. Indique el grado de importancia de los objetivos perseguidos al momento de realizar sus innovaciones en el período 2013 - 2014 <span style=\"color:red; font-weight: 100\">(Nota: Si el objetivo no fue perseguido al momento de realizar sus innovaciones, no conteste las siguientes preguntas)</span></p>\r\n</label>\r\n<div class=\"col-xs-12\" >\r\n    <table class=\"table  table-bordered\">\r\n        <thead>\r\n            <tr>\r\n                <th class=\"col-xs-6 col-sm-6 col-md-5\">\r\n                    <p>Actividad </p>\r\n                </th>\r\n                <th class=\"col-xs-6 col-sm-6 col-md-7\">\r\n                    <p>Grado de importancia</p>\r\n                </th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td>Ampliación de la gama de bienes y servicios</td>\r\n                <td class=\"text-center col-xs-6\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p1\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                    \r\n                </td>\r\n               \r\n            </tr>\r\n            <tr>\r\n                <td>Ingreso a nuevos mercados o incrementos de la participación en el mercado actual</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p2\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                     \r\n                     </td>\r\n            </tr>\r\n          <!--  <tr>\r\n                <td>Mejora en la calidad de los bienes y servicios</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p3\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                    </td>\r\n            </tr>-->\r\n            <tr>\r\n                <td>Aumentar la capacidad y/o flexibilidad para la producción de bienes y servicios</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p4\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Reducción de costos por unidad producida (p.e. laboral, consumo de materiales y de energía, etc.)</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p5\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Reducción del impacto medioambiental o mejorar la sanidad y la seguridad</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p6\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Reducir el tiempo de respuesta a la necesidad del cliente y/o proveedor</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p7\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td> Mejorar la habilidad para desarrollar nuevos productos y/o procesos</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p8\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Mejorar la calidad de sus bienes y/o servicios</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p9\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n<!--El 10 por defecto es -1 o cualquier valor no tomar en ccuenta?-->\r\n            <tr>\r\n                <td>Mejorar la comunicación y/o participación de información dentro de su empresa y/o con otras empresas y/o instituciones </td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p11\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Incrementar o mantener la participación de mercado</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p12\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>introducir productos para un nuevo segmento de mercado</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p13\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Introducir productos para un mercado geográficamente nuevo</td>\r\n                <td class=\"text-center\">\r\n                    <div class=\"rainbow-slider\">\r\n                        <slider ng-model=\"answers.s9.p14\" floor=\"0\" ceiling=\"100\"  step=\"1\">\r\n                        </slider>\r\n                        \r\n                    </div>\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n\r\n");
$templateCache.put("app/InstrumentoICAI/fieldsets/Obstáculos a la Innovación.html"," <label class=\"col-md-12 \">\r\n    <p>24. Señale el grado de importancia que tuvieron las siguientes barreras para la actividad innovadora en su empresa. <span style=\"color:red; font-weight: 100\">(Nota: Si la barrera no fue percibida al momento de realizar sus innovaciones, no conteste las siguientes preguntas)</span></p>\r\n</label>\r\n<div class=\"col-md-12\"> \r\n    <table class=\"table  table-bordered\" >\r\n        <thead>\r\n            <tr>\r\n                <th class=\"col-md-5\">\r\n                    <p>Barreras\r\n                    </p>\r\n                </th>\r\n                <th colspan=\"5\" class=\"col-md-7\">\r\n                    <p>Grado de importancia</p>\r\n                </th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr>\r\n                <td>Falta de fondos propios\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p1\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Falta de financiamiento externo a la empresa\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p2\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Alto costo de la innovación\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p3\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Falta de personal calificado\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p4\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Falta de información sobre la tecnología\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p5\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Falta de información sobre los mercados\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p6\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Dificultad en encontrar socios de cooperación para innovación\r\n                </td>\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p7\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Mercado dominado por empresas establecidas\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p8\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Incertidumbre respecto a la demanda por bienes o servicios innovadores\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p9\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>No es necesario debido a innovaciones previas\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p10\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>No es necesario por falta de demanda de innovaciones\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p11\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n            <tr>\r\n                <td>Dificultad regulatoria\r\n                    <td class=\"text-center\">\r\n                        <div class=\"rainbow-slider\">\r\n                            <slider ng-model=\"answers.s10.p12\" floor=\"0\" ceiling=\"100\" step=\"1\">\r\n                            </slider>\r\n                            \r\n                        </div>\r\n                    </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n");
$templateCache.put("app/InstrumentoICAI/partials/btn-save.tpl.html","<div style=\"margin: 0px\">\r\n	<button type=\'button\' class=\'btn btn-default btn-xs\' ng-click=\'vm.save()\'>\r\n		<p ng-class=\'vm.class\'></p> {{vm.text}}\r\n	</button>\r\n</div>");
$templateCache.put("app/InstrumentoICAI/partials/ciiuv_rev_4.tpl.html","");
$templateCache.put("app/InstrumentoICAI/partials/next_before.html"," \r\n    <div class=\"btn-group text-center\" role=\"group\" style=\"float:right\">\r\n        <button type=\"button\" class=\"btn btn-xs  btn-primary\" ng-click=\"characterizationCtrl.changePage(-1)\">\r\n            <div class=\"glyphicon glyphicon-chevron-left\"></div> Anterior\r\n        </button>\r\n        <button type=\"button\" class=\"btn btn-xs  btn-primary\" ng-click=\"characterizationCtrl.changePage(1)\">\r\n            Siguiente\r\n            <div class=\"glyphicon glyphicon-chevron-right\"></div>\r\n        </button>\r\n    </div>\r\n ");
$templateCache.put("app/InstrumentoICAI/partials/orderButton.html","<!-- Text input-->\r\n\r\n    <div class=\"col-md-6\">\r\n        <div class=\"btn-group\">\r\n            <label class=\"btn btn-info btn-sm\" ng-model=\"opc.elem\" btn-checkbox ng-click=\"order.setOrdersRes($index)\" ng-repeat=\"opc in order.check\">{{opc.text}} </label>\r\n        </div>\r\n        <span class=\"help-block\" style=\"color:green\">{{order.message}}</span>\r\n    </div>\r\n");
$templateCache.put("app/InstrumentoICAI/partials/pips.html","    <div class=\"pips col-xs-12\" >\r\n        <span class=\"ui-slider-pip\" style=\"left: 10%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">10</span></span>\r\n        <span class=\"ui-slider-pip\" style=\"left: 20%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">20</span></span>\r\n        <span class=\"ui-slider-pip\" style=\"left: 30%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">30</span></span>\r\n        <span class=\"ui-slider-pip\" style=\"left: 40%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">40</span></span>\r\n        <span class=\"ui-slider-pip\" style=\"left: 50%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">50</span></span>\r\n        <span class=\"ui-slider-pip\" style=\"left: 60%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">60</span></span>\r\n        <span class=\"ui-slider-pip\" style=\"left: 70%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">70</span></span>\r\n        <span class=\"ui-slider-pip\" style=\"left: 80%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">80</span></span>\r\n        <span class=\"ui-slider-pip\" style=\"left: 90%;\"><span class=\"ui-slider-line-pip\"></span><span class=\"ui-slider-line\">90</span></span>\r\n    </div>");
$templateCache.put("app/InstrumentosAux/InstrumentoAux1/instrumentoAux1.html","<div class=\"container-fluid \"  data-sr-container=\'{ \"reset\":true, \"vFactor\": 0.1 }\'>\r\n    <div id=\"slider1_container\" style=\"position: relative; top: 0px; left: 0px; width: 1400px; height: 200px;\" >\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; overflow: hidden; left: 0px; top: 0px; width: 1400px; height: 200px;\">\r\n            <div><img u=\"image\" src=\"assets/images/image1.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image2.jpg\" /></div>\r\n            <div><img u=\"image\" src=\"assets/images/image3.jpg\" /></div>\r\n        </div>\r\n    </div>\r\n   \r\n    <div class=\"row\" style=\"margin-top:30px\" id=\"survey\">\r\n        <a name=\"survey\" href></a>\r\n        <div class=\"col-md-10 col-md-offset-1 \">\r\n           \r\n        </div>\r\n    </div>\r\n    <!--\r\n    <div class=\"row\">\r\n        <div class=\"col-md-10 col-md-offset-1\">\r\n            <div class=\"progress  progress-striped active\">\r\n                <div class=\"progress-bar progress-bar-info\" style=\"width: {{properties.progress}}%;\">{{properties.progress}}%</div>\r\n            </div>\r\n        </div> \r\n    </div>\r\n    -->\r\n    <div class=\"jumbotron\" ng-show=\"finished==true\">\r\n        <div ng-repeat=\"session in sessions\">\r\n        </div>\r\n        <div class=\"container\">\r\n            <div class=\"col-md-offset-2 col-md-8\">\r\n                <div class=\"alert alert-success\" role=\"alert\">\r\n                    <h4><span class=\"glyphicon glyphicon-ok\"></span> Felicitaciones! Usted a Finalizado Satisfactoriamente, Gracias por su tiempo.</h4></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6 col-md-offset-3 \">\r\n            <div class=\"panel panel-primary panel-opacity\"   data-sr=\'enter top\'>\r\n                <div class=\"panel-heading\" >\r\n                    <div class=\"row\">\r\n                        <div class=\"col-md-12\" >\r\n                           \r\n                             <h4 >Hacer click en las palabras que mejor describan su estilo para resolver problemas.</p><p> Organizarlas de mayor a menor.</h4>\r\n                        </div>\r\n   \r\n                    </div>\r\n                </div>\r\n                <div class=\"panel-body\">\r\n\r\n<p class=\"text-center h2\">Grupo {{vm.question_index+ 1}} de 18.</p>\r\n                    <slick data-sr=\'enter left wait 0.5s\' style=\"min-height: 200px; top:38px\"  current-index=\"vm.question_index\" speed=400  init-onload=\"false\" slick-apply=\'slickApply\' data=\"dataLoaded\" slides-to-show=\"1\" dots=\"true\" next-arrow=\".slick_right\" prev-arrow=\".slick_left\">\r\n                     <div style=\"min-height: 200px\" class=\"text-center\" ng-repeat=\"words in questions\">\r\n                     <div style=\"height:100%;top:30%; position:relative\">\r\n                            <div input-order items=\'words\' callback=\'changeIndex(result)\'></div>\r\n                            <div ng-show=\"true\">\r\n\r\n                            </div>\r\n\r\n                    </div>\r\n                     <div ng-show=\"vm.question_index + 1>=18\">\r\n                            <button type=\"button\" class=\"btn btn-xs  btn-success\" ng-click=\"icaiCtrl.changePage(0)\" >\r\n                                                Finalizar\r\n                                                <div class=\"glyphicon glyphicon-check\"></div>\r\n                            </button>\r\n                     </div>\r\n                     </div>\r\n\r\n                    \r\n\r\n                    </slick>\r\n                    <a href=\"\" class=\"slick_left pull-left visible-md visible-sm visible-lg\">\r\n                        <i class=\" mdi-hardware-keyboard-arrow-left\"></i>\r\n                    </a>\r\n                    <a href=\"\" class=\"slick_right pull-right visible-md visible-sm visible-lg\">\r\n                        <i class=\"  mdi-hardware-keyboard-arrow-right\"></i>\r\n                    </a>\r\n                    </slick>\r\n                    <a href=\"\" class=\"slick_left pull-left visible-xs\">\r\n                        <i class=\" mdi-hardware-keyboard-arrow-left\"></i>\r\n                    </a>\r\n                    <a href=\"\" class=\"slick_right pull-right visible-xs\">\r\n                        <i class=\"  mdi-hardware-keyboard-arrow-right\"></i>\r\n                    </a>\r\n                </div>\r\n\r\n\r\n                <div class=\"panel-footer\">\r\n                    <div class=\"container\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-xs-12 col-sm-12 col-md-6 \">\r\n                                <!-- Default panel contents -->\r\n                                <div>Comuníquese con cualquiera de nuestros consultores a las siguientes líneas telefónicas: 301 485 1346 - 301 485 1536 - 300 265 8510 - 301 485 1421 - 301 485 1567 - 301 484 9940.</div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--    <div class=\"question_bg\">\r\n            <img src=\"assets/images/questions_bg.png\" alt=\"bg\">\r\n        </div>-->\r\n    </div>\r\n</div>\r\n    <script type=\"text/ng-template\" id=\"myModalContent.html\">\r\n \r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">Finalizado Correctamente!</h3>\r\n    </div> <div class=\"col-md-10 col-md-offset-1\">\r\n    <div class=\"modal-body\"> \r\n    <p>Si conoce a otras empresas que puedan estar interesadas en estre proyecto, por favor indique los datos solicitados a continuación:</p>\r\n       \r\n           \r\n            <br>\r\n             <div class=\"row\" ng-repeat=\"referrer in vm.referrers\">\r\n                <label class=\"col-md-3\">Nombre:\r\n                    <input type=\"text\" value=\"referrer.nombre\" ng-model=\"referrer.nombre\" >\r\n                </label>\r\n                <label class=\"col-md-3\">Empresa:\r\n                    <input type=\"text\" value=\"referrer.empresa\" ng-model=\"referrer.empresa\">\r\n                </label class=\"col-md-3\">\r\n                <label class=\"col-md-3\">Email:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.mail\">\r\n                </label>\r\n                <label class=\"col-md-3\">Telefono:\r\n                    <input type=\"text\" value=\"referrer.email\" ng-model=\"referrer.tel\">\r\n                </label>\r\n            </div>\r\n            <br>\r\n            <button class=\"btn btn-sm btn-info\" ng-click=\"vm.add_referrer()\">Añadir otra Empresa</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">Enviar</button>\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"cancel()\">Finalizar</button>\r\n    </div>\r\n \r\n\r\n    </script>\r\n\r\n\r\n <script>\r\n    jQuery(document).ready(function($) {\r\n        var options = {};\r\n        var jssor_slider1 = new $JssorSlider$(\'slider1_container\', options);\r\n\r\n        //responsive code begin\r\n        //you can remove responsive code if you don\'t want the slider scales\r\n        //while window resizes\r\n        function ScaleSlider() {\r\n            var parentWidth = $(\'#slider1_container\').parent().width();\r\n            if (parentWidth) {\r\n                jssor_slider1.$ScaleWidth(parentWidth);\r\n            } else\r\n                window.setTimeout(ScaleSlider, 30);\r\n        }\r\n        //Scale slider after document ready\r\n        ScaleSlider();\r\n\r\n        //Scale slider while window load/resize/orientationchange.\r\n        $(window).bind(\"load\", ScaleSlider);\r\n        $(window).bind(\"resize\", ScaleSlider);\r\n        $(window).bind(\"orientationchange\", ScaleSlider);\r\n        //responsive code end\r\n    });\r\n    </script>");
$templateCache.put("app/components/ciiuv_4/ciiuv.html"," <div class=\"modal-header\">\r\n            <h3 class=\"modal-title\">¿Cuál de estos sectores (CIIU Rev. 4) representa plenamente la actividad económica principal de su empresa?</h3>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n\r\n            <table class=\"table table-striped table-condensed\">\r\n                <thead>\r\n                    <tr>\r\n                        <th></th>\r\n                        <th>CIIU Rev. 4</th>\r\n                        <th>Descripción</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr ng-repeat=\"row in vm.revs\">\r\n                        <td><input name=\"selection\" type=\"radio\" ng-model=\"vm.selected\" value=\"{{row.rev}}\" ></td>\r\n                        <td>{{row.rev}}</td>\r\n                        <td>{{row.desc}} </td>\r\n\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n            <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ok()\">OK</button>\r\n            <button class=\"btn btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\r\n        </div>\r\n</div>\r\n\r\n");
$templateCache.put("app/components/inputOrder/inputOrder.html","<!-- Text input-->\r\n<div class=\"form-group\">\r\n    <div class=\"col-md-12\">\r\n        <div class=\"btn-group\">\r\n            <label ng-click=\"vm.update_result(item.text, item.value, $index)\"class=\"btn btn-info btn-sm hvr-grow-shadow\" ng-model=\"vm.items[$index].value\" btn-checkbox ng-repeat=\"item in vm.items\">{{item.text}}  <span class=\"badge\" ng-show=\"vm.getOrder(item.text)>0\">{{vm.getOrder(item.text)}}</span></label>\r\n        </div>\r\n      \r\n        <span class=\"help-block h4\" style=\"color:green\">\r\n        {{vm.currentMessage}}\r\n        <h4 ng-show=\"vm.items.finished\">\r\n        <i class=\"mdi-action-done-all\"></i>\r\n        </h4>\r\n        </span>\r\n    </div>\r\n    \r\n</div>");
$templateCache.put("app/components/inputScala/inputScala.html","	<div class=\"text-center\">\r\n	<div class=\"btn-group\" id=\"input-scala\">\r\n        <label class=\"btn btn-warning btn-xs\" ng-model=\"vm.selectedItem\" btn-radio=\"\'1\'\">1</label>\r\n        <label class=\"btn btn-warning btn-xs\" ng-model=\"vm.selectedItem\" btn-radio=\"\'2\'\">2</label>\r\n        <label class=\"btn btn-warning btn-xs\" ng-model=\"vm.selectedItem\" btn-radio=\"\'3\'\">3</label>\r\n        <label class=\"btn btn-warning btn-xs\" ng-model=\"vm.selectedItem\" btn-radio=\"\'4\'\">4</label>\r\n        <label class=\"btn btn-warning btn-xs\" ng-model=\"vm.selectedItem\" btn-radio=\"\'5\'\">5</label>\r\n        <label class=\"btn btn-warning btn-xs\" ng-model=\"vm.selectedItem\" btn-radio=\"\'6\'\">6</label>\r\n        <label class=\"btn btn-warning btn-xs\" ng-model=\"vm.selectedItem\" btn-radio=\"\'7\'\">7</label>\r\n    </div>\r\n </div>");
$templateCache.put("app/components/navbar/navbar.html","<nav class=\"navbar navbar-static-top navbar-warning skin-black-light shadow-z-2\" data-sr=\'ease up 30% wait 0.5s \'>\n  <div class=\"container\"> \n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" ng-href=\"#caracterizacion\">\n         <img class=\"img-responsive\" alt=\"Brand\" src=\"assets/logo.png\">\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-6\">\n      <ul class=\"nav navbar-nav  navbar-right\">\n    \n        <!--<li><a ng-href=\"#caracterizacion\" >Caraterización</a></li>-->\n          <!--  <li><a ng-href=\"#home\">Inicio</a></li>\n        <li><a ng-href=\"#home\">Salir</a></li>-->\n        <!--<li  ng-show = \"!vm.isLogged()\"><a  ng-href=\"#login\">Login</a></li>-->\n        \n        <li ng-show=\"vm.isLogged()\"><a ng-href=\"#instrumentos\" >Instrumentos <i class=\"ion ion-ios-list-outline\"></i></a></li>\n        <li ng-show=\"vm.isLogged()\"><a ng-href=\"#logout\" ng-click=\"vm.logout()\">Salir <i class=\"ion ion-log-out\"></i></a></li>\n\n        \n      \n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right acme-navbar-text\">\n        <li></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n");
$templateCache.put("app/components/slider/slider.html","\r\n    <div id=\"slider1_container\" style=\"position: relative; margin: 0 auto;\r\n        top: 0px; left: 0px; width: 1300px; height: 500px; overflow: hidden;\">\r\n        <!-- Loading Screen -->\r\n        <div u=\"loading\" style=\"position: absolute; top: 0px; left: 0px;\">\r\n            <div style=\"filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block;\r\n                top: 0px; left: 0px; width: 100%; height: 100%;\">\r\n            </div>\r\n            <div style=\"position: absolute; display: block; background: url(../img/loading.gif) no-repeat center center;\r\n                top: 0px; left: 0px; width: 100%; height: 100%;\">\r\n            </div>\r\n        </div>\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" style=\"cursor: move; position: absolute; left: 0px; top: 0px; width: 1300px;\r\n            height: 500px; overflow: hidden;\">\r\n            <div>\r\n                <img u=\"image\" src=\"../img/1920/red.jpg\" />\r\n                <div u=\"caption\" t=\"NO\" t3=\"RTT|2\" r3=\"137.5%\" du3=\"3000\" d3=\"500\" style=\"position: absolute; width: 445px; height: 300px; top: 100px; left: 600px;\">\r\n                    <img src=\"../img/new-site/c-phone.png\" style=\"position: absolute; width: 445px; height: 300px; top: 0px; left: 0px;\" />\r\n                    <img u=\"caption\" t=\"CLIP|LR\" du=\"4000\" t2=\"NO\" src=\"../img/new-site/c-jssor-slider.png\" style=\"position: absolute; width: 102px; height: 78px; top: 70px; left: 130px;\" />\r\n                    <img u=\"caption\" t=\"ZMF|10\" t2=\"NO\" src=\"../img/new-site/c-text.png\" style=\"position: absolute; width: 80px; height: 53px; top: 153px; left: 163px;\" />\r\n                    <img u=\"caption\" t=\"RTT|10\" t2=\"NO\" src=\"../img/new-site/c-fruit.png\" style=\"position: absolute; width: 140px; height: 90px; top: 60px; left: 220px;\" />\r\n                    <img u=\"caption\" t=\"T\" du=\"4000\" t2=\"NO\" src=\"../img/new-site/c-navigator.png\" style=\"position: absolute; width: 200px; height: 155px; top: 57px; left: 121px;\" />\r\n                </div>\r\n                <div u=\"caption\" t=\"RTT|2\" r=\"-75%\" du=\"1600\" d=\"2500\" t2=\"NO\" style=\"position: absolute; width: 470px; height: 220px; top: 120px; left: 650px;\">\r\n                    <img src=\"../img/new-site/c-phone-horizontal.png\" style=\"position: absolute; width: 470px; height: 220px; top: 0px; left: 0px;\" />\r\n                    <img u=\"caption\" t3=\"MCLIP|L\" du3=\"2000\" src=\"../img/new-site/c-slide-1.jpg\" style=\"position: absolute; width: 379px; height: 213px; top: 4px; left: 45px;\" />\r\n                    <img u=\"caption\" t=\"MCLIP|R\" du=\"2000\" t2=\"NO\" src=\"../img/new-site/c-slide-3.jpg\" style=\"position: absolute; width: 379px; height: 213px; top: 4px; left: 45px;\" />\r\n                    <img u=\"caption\" t=\"RTTL|BR\" x=\"500%\" y=\"500%\" du=\"1000\" d=\"-3000\" r=\"-30%\" t3=\"L\" x3=\"70%\" du3=\"1600\" src=\"../img/new-site/c-finger-pointing.png\" style=\"position: absolute; width: 257px; height: 300px; top: 80px; left: 200px;\" />\r\n                    <img src=\"../img/new-site/c-navigator-horizontal.png\" style=\"position: absolute; width: 379px; height: 213px; top: 4px; left: 45px;\" />\r\n                </div>\r\n                <div style=\"position: absolute; width: 480px; height: 120px; top: 30px; left: 30px; padding: 5px;\r\n                    text-align: left; line-height: 60px; text-transform: uppercase; font-size: 50px;\r\n                        color: #FFFFFF;\">Touch Swipe Slider\r\n                </div>\r\n                <div style=\"position: absolute; width: 480px; height: 120px; top: 300px; left: 30px; padding: 5px;\r\n                    text-align: left; line-height: 36px; font-size: 30px;\r\n                        color: #FFFFFF;\">\r\n                        Build your slider with anything, includes image, content, text, html, photo, picture\r\n                </div>\r\n            </div>\r\n            <div>\r\n                <img u=\"image\" src=\"../img/1920/purple.jpg\" />\r\n                <div style=\"position: absolute; width: 480px; height: 120px; top: 30px; left: 30px; padding: 5px;\r\n                    text-align: left; line-height: 60px; text-transform: uppercase; font-size: 50px;\r\n                        color: #FFFFFF;\">Touch Swipe Slider\r\n                </div>\r\n                <div style=\"position: absolute; width: 480px; height: 120px; top: 300px; left: 30px; padding: 5px;\r\n                    text-align: left; line-height: 36px; font-size: 30px;\r\n                        color: #FFFFFF;\">\r\n                        Build your slider with anything, includes image, content, text, html, photo, picture\r\n                </div>\r\n            </div>\r\n            <div>\r\n                <img u=\"image\" src=\"../img/1920/blue.jpg\" />\r\n                <div style=\"position: absolute; width: 480px; height: 120px; top: 30px; left: 30px; padding: 5px;\r\n                    text-align: left; line-height: 60px; text-transform: uppercase; font-size: 50px;\r\n                        color: #FFFFFF;\">Touch Swipe Slider\r\n                </div>\r\n                <div style=\"position: absolute; width: 480px; height: 120px; top: 300px; left: 30px; padding: 5px;\r\n                    text-align: left; line-height: 36px; font-size: 30px;\r\n                        color: #FFFFFF;\">\r\n                        Build your slider with anything, includes image, content, text, html, photo, picture\r\n                </div>\r\n            </div>\r\n        </div>\r\n                \r\n        <!--#region Bullet Navigator Skin Begin -->\r\n        <!-- Help: http://www.jssor.com/development/slider-with-bullet-navigator-jquery.html -->\r\n      \r\n        <!-- bullet navigator container -->\r\n        <div u=\"navigator\" class=\"jssorb21\" style=\"bottom: 26px; right: 6px;\">\r\n            <!-- bullet navigator item prototype -->\r\n            <div u=\"prototype\"></div>\r\n        </div>\r\n        <!--#endregion Bullet Navigator Skin End -->\r\n        \r\n        <!--#region Arrow Navigator Skin Begin -->\r\n        <!-- Help: http://www.jssor.com/development/slider-with-arrow-navigator-jquery.html -->\r\n  \r\n        <!-- Arrow Left -->\r\n        <span u=\"arrowleft\" class=\"jssora21l\" style=\"top: 123px; left: 8px;\">\r\n        </span>\r\n        <!-- Arrow Right -->\r\n        <span u=\"arrowright\" class=\"jssora21r\" style=\"top: 123px; right: 8px;\">\r\n        </span>\r\n        <!--#endregion Arrow Navigator Skin End -->\r\n        <a style=\"display: none\" href=\"http://www.jssor.com\">Bootstrap Slider</a>\r\n    </div>");
$templateCache.put("app/components/sponsors/sponsors.html","   <div class=\"container sponsor\">\r\n    <script>\r\n        jQuery(document).ready(function ($) {\r\n            var options = {\r\n                $AutoPlay: false,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false\r\n                $AutoPlaySteps: 1,                                  //[Optional] Steps to go for each navigation request (this options applys only when slideshow disabled), the default value is 1\r\n                $AutoPlayInterval: 0,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000\r\n                $PauseOnHover: 4,                               //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1\r\n\r\n                $ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false\r\n                $SlideEasing: $JssorEasing$.$EaseLinear,          //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad\r\n                $SlideDuration: 5000,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500\r\n                $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20\r\n                $SlideWidth: 140,                                   //[Optional] Width of every slide in pixels, default value is width of \'slides\' container\r\n                //$SlideHeight: 100,                                //[Optional] Height of every slide in pixels, default value is height of \'slides\' container\r\n                $SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0\r\n                $DisplayPieces: 6,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1\r\n                $ParkingPosition: 0,                              //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.\r\n                $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).\r\n                $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1\r\n                $DragOrientation: 1                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)\r\n            };\r\n\r\n            var jssor_slider1 = new $JssorSlider$(\"slider1_container\", options);\r\n\r\n            //responsive code begin\r\n            //you can remove responsive code if you don\'t want the slider scales while window resizes\r\n            function ScaleSlider() {\r\n                var bodyWidth = document.body.clientWidth;\r\n                if (bodyWidth)\r\n                    jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 1100));\r\n                else\r\n                    window.setTimeout(ScaleSlider, 30);\r\n            }\r\n            ScaleSlider();\r\n\r\n            $(window).bind(\"load\", ScaleSlider);\r\n            $(window).bind(\"resize\", ScaleSlider);\r\n            $(window).bind(\"orientationchange\", ScaleSlider);\r\n            //responsive code end\r\n        });\r\n    </script>\r\n    <!-- Jssor Slider Begin -->\r\n    <!-- To move inline styles to css file/block, please specify a class name for each element. --> \r\n    <div id=\"slider1_container\" class=\"col-sm-12\" style=\"position: relative; top: 0px; left: 0px; height: 100px;\">\r\n\r\n        <!-- Loading Screen -->\r\n        <div u=\"loading\" style=\"position: absolute; top: 0px; left: 0px;\">\r\n            <div style=\"filter: alpha(opacity=70); opacity:0.7; position: absolute; display: block;\r\n                background-color: #000; top: 0px; left: 0px;width: 100%;height:100%;\">\r\n            </div>\r\n            <div style=\"position: absolute; display: block; background: url(assets/img/loading.gif) no-repeat center center;\r\n                top: 0px; left: 0px;width: 100%;height:100%;\">\r\n            </div>\r\n        </div>\r\n\r\n        <!-- Slides Container -->\r\n        <div u=\"slides\" class=\"col-xs-offset-1 col-xs-10\" style=\"cursor: move; position: absolute; left: 0px; top: 0px;  height: 100px; overflow: hidden;\">\r\n            <div ><img style=\"padding: 3px\" u=\"image\" alt=\"acopi\" src=\"assets/logos/logo1.png\" /></div>\r\n            <div ><img style=\"padding: 3px\" u=\"image\" alt=\"atlantico\" src=\"assets/logos/logo2.png\" /></div>\r\n            <div ><img style=\"padding: 3px\" u=\"image\" alt=\"scr\" src=\"assets/logos/logo3.png\" /></div>\r\n            <div ><img style=\"padding: 3px\" u=\"image\" alt=\"colciencias\" src=\"assets/logos/logo4.png\" /></div>\r\n            <div ><img style=\"padding: 3px\" u=\"image\" alt=\"uninorte\" src=\"assets/logos/logo5.png\" /></div>\r\n            <div ><img style=\"padding: 3px\" u=\"image\" alt=\"unisimon\" src=\"assets/logos/logo6.png\" /></div>\r\n            <div ><img style=\"padding: 3px\" u=\"image\" alt=\"americana\" src=\"assets/logos/logo7.png\" /></div>\r\n         \r\n        </div>\r\n\r\n    </div>\r\n    <!-- Jssor Slider End -->\r\n\r\n    </div>");}]);