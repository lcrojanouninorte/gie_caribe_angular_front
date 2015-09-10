(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).state('caracterizacion', {
        url: '/caracterizacion',
        templateUrl: 'app/characterization/characterization.html',
        controller: 'CharacterizationController',
        controllerAs: 'characterizationCtrl',
         authenticate: true
      }).state('detalle', {
        url: '/detalle/:id',
        templateUrl: 'app/characterization/characterization.detalle.html',
        controller: 'CharacterizationController',
        controllerAs: 'characterizationCtrl',
         authenticate: false
      }).state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        reload: true
      
      }).state('resultados', {
        url: '/resultados',
        templateUrl: 'app/results/results.html',
        controller: 'ResultsController',
        controllerAs: 'resultCtrl',
         authenticate: false
      }).state('survey', {
        url: '/caracterizacion/instrumento'
    });

    $urlRouterProvider.otherwise('/login');
  }

})();
