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
        	
        
    


})();
