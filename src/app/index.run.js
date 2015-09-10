(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $anchorScroll, $rootScope, $location, $cookies, auth, $state) {
$anchorScroll.yOffset = 50; 
    $log.debug('runBlock end');

    //Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

           var isLogin = toState.name === "login";
	        if(isLogin){
	           return; // no need to redirect 
	        }
	         //var userInfo = auth.getUser();

  //if(false) {
	        if(!auth.isLogged() && toState.authenticate ) {
	           event.preventDefault(); // stop current execution
	              $state.go('login', {}, { reload: true });
	        }else{
	        	 // $state.go( toState.name); 
             
	        }

        });
  }


})();
