(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .factory('auth', auth);

  /** @ngInject */
  function auth($http, $log, $cookies, $state) {
    var apiLogIn = 'http://surveyapi.herokuapp.com/session/signin';
    var apiSingUp = 'http://surveyapi.herokuapp.com/users/signup'
    var user = {   };
    var token = null;


    var service = {
      login: login,
      singup: singup,
      logout: logout,
      isLogged:isLogged,
      getUser:getUser
    };

    return service;

    function getUser(){
      return $cookies.user_id;
    }
    function singup(data) {

      return  $http.post(apiSingUp, data).
              then(getAnswersComplete, getAnswersFailed);

      function getAnswersComplete(response) {
        if(response.status == 200){
            if(response.data.user.auth_token != null){
                $cookies["user_id"] = response.data.user.id;
                $cookies["token"] = response.data.user.auth_token;
                $cookies["email"] = response.data.user.email;
               return $cookies["user_id"];
             }else{
               return null;
             }
               
        }else{
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
              if(response.data.user.auth_token != null){
                $cookies["user_id"] = response.data.user.id;
                $cookies["token"] = response.data.user.auth_token;
                $cookies["email"] = response.data.user.email;
                return $cookies["user_id"];
              }else{
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
   //var data = {characterization:{user_id:5}}
    delete  $cookies["user_id"];
    delete $cookies["token"];
    delete $cookies["email"];

    //reload
  
   

   
    }


     function isLogged() {
      if(  $cookies.user_id!= null){
          return true;

      }else{
        return false;
      }

        
      function getAnswersComplete(response) {
        return response.data;
      }

      function getAnswersFailed(error) {
        $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
      }
    }


  }
})();
