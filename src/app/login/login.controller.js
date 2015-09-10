(function() {
        'use strict';

        angular
            .module('InnovationManagement')
            .controller('LoginController', LoginController);

        /** @ngInject */

        function LoginController(auth, $scope, $cookies, $cookieStore, $location, $state,toaster) {
           

            var vm = this;
           function clear(){
            $scope.answers = {};
             $scope.properties = {
            nRespuestas: 0,
            progress: 0,
            nPreguntas: 90,
            total: 0,
            index: 0
        };
 $scope.sessions ={};


  
}
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


clear();
                $scope.user.user.password_confirmation = $scope.user.user.password;
                $scope.session.session.email = $scope.user.user.email;
                $scope.session.session.password = $scope.user.user.password;
                auth.login($scope.session).then(function(data) {
                    if (data != null) {
                        $scope.user_id = data;
                        $state.go('caracterizacion');
                    } else {

                        toaster.pop('info', "Información:", "Usuario no registrado, o contraseña invalida");
                        vm.classAnimation = '';

                        //$state.go('login');
                    }
                });




            }


            $scope.registrar = function() {
                clear();
                $scope.user.user.password_confirmation = $scope.user.user.password;
                $scope.session.session.email = $scope.user.user.email;
                $scope.session.session.password = $scope.user.user.password;
                auth.singup($scope.user).then(function(data) {
                    if (data != null) {
                        $state.go('caracterizacion');
                    } else {

                        toaster.pop('info', "Información:", "Usuario ya existe");
                        vm.classAnimation = '';

                        //$state.go('login');
                    }
                });




            }



            
}


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