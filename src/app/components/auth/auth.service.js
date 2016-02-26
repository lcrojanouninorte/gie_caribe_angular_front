    (function() {
    'use strict';

    angular
        .module('InnovationManagement')
        .factory('auth', auth);

    /** @ngInject */
    function auth($http, $log, $cookies, Restangular) {
        var apiLogIn = 'http://surveyapi.herokuapp.com/session/signin';
        var apiSingUp = 'http://surveyapi.herokuapp.com/users/signup';
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
            return $cookies.user_id;
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
                        $cookies.user_id = response.data.user.id;
                        $cookies.token = response.data.user.auth_token;
                        $cookies.email = response.data.user.email;
                        return $cookies.user_id;
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

                        $cookies.user_id = response.data.user.id;
                        $cookies.token = response.data.user.auth_token;
                        $cookies.email = response.data.user.email;
                        $log.debug('cokies as', $cookies);
                        return $cookies.user_id;
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

                        $cookies.user_id = response.data.user.id;
                        $cookies.token = response.data.user.auth_token;
                        $cookies.email = response.data.user.email;
                        $log.debug('cokies as', $cookies);
                        return $cookies.user_id;
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
            delete $cookies["user_id"];
            delete $cookies["token"];
            delete $cookies["email"];

            //reload
            // $state.go('login', {}, { reload: true });
        }


        function isLogged() {
          //  $log.debug('entro a islogged', $cookies);
            if ($cookies["user_id"]) {
                return true;
            } else {
                return false;
            }

        }


    }
})();
