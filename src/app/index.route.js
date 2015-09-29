(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      /*.state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })*/
        .state('icai', {
        url: '/icai',
        templateUrl: 'app/InstrumentoICAI/icai.html',
        controller: 'IcaiController',
        controllerAs: 'icaiCtrl',
         authenticate: true
      })
    /*  .state('imi', {
        url: '/imi',
        templateUrl: 'app/InstrumentoIMI/imi.html',
        controller: 'ImiController',
        controllerAs: 'imiCtrl',
         authenticate: true
      })
      .state('instrumentos', {
        url: '/instrumentos',
        templateUrl: 'app/Instrumentos/Instrumentos.html',
        controller: 'InstumentosController',
        controllerAs: 'instCtrl',
         authenticate: false
      })
      .state('resultados', {
        url: '/resultados',
        templateUrl: 'app/results/results.html',
        controller: 'ResultsController',
        controllerAs: 'restultsCtrl',
        reload: true
      
      }).state('detalle', {
        url: '/detalle/:id',
        templateUrl: 'app/InstrumentoICAI/icai.detalle.html',
        controller: 'IcaiController',
        controllerAs: 'icaiCtrl',
        reload: true
      
      })*/
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        reload: true
      
      });/*.state('survey', {
        url: '/caracterizacion/instrumento'
    });*/

    $urlRouterProvider.otherwise('/login');
  }

})();
