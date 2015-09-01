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
        controllerAs: 'characterizationCtrl'
      }).state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
      
      }).state('survey', {
        url: '/caracterizacion/instrumento',
        onEnter: function () {
            $('html, body').animate({
                scrollTop: $("#survey").offset().top
            }, 2000);
        }
    });

    $urlRouterProvider.otherwise('/login');
  }

})();
