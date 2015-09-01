
(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .controller('CharacterizationController', characterizationController);

  /** @ngInject */
  function characterizationController(characterizationsAnswers, $scope) {
    var vm = this;
    vm.panelTitle = "";
    vm.session1 = "Ok";
    vm.page = 0;
    vm.pages = [];
    vm.saveStatus = "disk";
    vm.today = new Date();
    vm.status = {opened:false}; 
    $scope.user_id = 10;
    $scope.nPreguntas = 0;
    $scope.answers = {};
    $scope.properties= {nRespuestas:0,progress:0, nPreguntas :91, total : 0, index:0};
    $scope.msgs =[""];
    vm.answers = {};
   
    $scope.sessions = {
     s1: {title: "Identificación de la empresa", active: true, state: 0, questions: 4,  session: ".s1"},
     s2: {title: "Datos del informante",  state: 0, questions: 5 , session: ".s2"},
     s3: {title: "Caracteristicas Basícas de la Empresa", active: false, state: 0, questions: 7, session: ".s3"},
     s4: {title: "Innovación de producto",   state: 0, questions: 3, session: ".s4"},
     s5: {title: "Innovación en Procesos",   state: 0, questions: 3, session: ".s5"},
     s6: {title: "Innovación Organizacional",   state: 0, questions: 3, session: ".s6"},
     s7: {title: "Innovación en Marketing",   state: 0, questions: 5, session: ".s7"},
     s8: {title: "Actividades de Innovación",   state: 0, questions: 12, session: ".s8"},
     s9: {title: "Objetivos y Efectos",   state: 0, questions: 14, session: ".s9"},
     s10: {title: "Obstáculos a la innovación",  state: 0, questions: 12, session: ".s10"},
     s11: {title: "Actividad relacional",   state: 0, questions: 23, session: ".s11"}
    
    

     };
 
    //Mensajes para pregunta answers.s3.p5
    $scope.order = {};
   
    $scope.order.message = $scope.msgs[$scope.properties.index];
   
  
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
            if ($scope.properties.index == 3) {
                $scope.answers.s3.p5 = $scope.order.checkResponse[0] + ", " + $scope.order.checkResponse[1] + ", " + $scope.order.checkResponse[2] + ", "
                $scope.order.message = "Su respuesta es: " + $scope.answers.s3.p5;
            }

        }


    }

//get response
      characterizationsAnswers.getAnswers($scope.user_id).then(function(data) {

            //$scope.answers = data;
            if(!$.isEmptyObject( data) || data!=null){
             $scope.answers =  characterizationsAnswers.getInSessions(data);
            }else{
              $scope.answers = characterizationsAnswers.getEmptyAnswers();
            }
           
            console.log($scope.answers);
               activate();
            return data;
        });



    function compare(a,b) {
      if (a.order < b.order)
        return -1;
      if (a.order > b.order)
        return 1;
      return 0;
    }


    function activate() {

     vm.pages = [
     {key:"s1",active: true},
     {key:"s2",active: false},
     {key:"s3",active: false},
     {key:"s4",active: false},
     {key:"s5",active: false},
     {key:"s6",active: false},
     {key:"s7",active: false},
     {key:"s8",active: false},
     {key:"s9",active: false},
     {key:"s10",active: false},
     {key:"s11",active: false}
    

     ];
 if($scope.answers.s3.p5 == ""){
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
  }else{
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

      //console.log( $scope.answers);
      /*var datas = characterizationsAnswers.getAnswers2(5).then(function(data) {
           
            console.log(data);
          return data;
        });*/
      angular.forEach($scope.answers, function(session){
        $scope.nPreguntas += session.length;

      })
      //console.log($scope.answers);
      /* characterizationsAnswers.getAnswers(5).then(function(data) {
          vm.answers = data;
            console.log(vm.answers);
          return vm.answers;
        });*/
$scope.$watch(function(){
      return $scope.answers;
    }, function(newValues, oldValues, scope) {
        $scope.properties.nRespuestas = 0;
        $scope.properties.progress = 0;
       angular.forEach(newValues, function(snv, snk){
         $scope.sessions[snk].answered = 0;
          angular.forEach(snv, function(pnv, pnk){
            if(pnv!="" && typeof pnv!="undefined"){
              $scope.properties.nRespuestas +=1; 
              $scope.sessions[snk].answered +=1;
            }
          });
          if($scope.sessions[snk].questions == $scope.sessions[snk].answered){
            $scope.sessions[snk].state = 1;
          }else{
            $scope.sessions[snk].state = 0;
          }
          $scope.sessions[snk].unAnswered  = $scope.sessions[snk].questions - $scope.sessions[snk].answered;
       });
        $scope.properties.progress = Math.floor($scope.properties.nRespuestas/$scope.properties.nPreguntas*100);
        if($scope.properties.progress >= 100){
          //characterizationsAnswers.setAnswers($scope.user_id, $scope.answers);
        }
    }, true);

$scope.$watchGroup([
  'answers.s8.p1',
  'answers.s8.p2',
  'answers.s8.p3',
  'answers.s8.p4',
  'answers.s8.p5',
  'answers.s8.p6',
  'answers.s8.p7',
  'answers.s8.p8',
  'answers.s8.p9',

  ], function(newValues, oldValues, scope){
    $scope.properties.total  = 0;
    angular.forEach(newValues, function(pn){
        if(pn==true){
          $scope.properties.total +=1; 
        }
    })
  });

 $scope.msgs = [
        "Elija el primer más importante",
        "Elija el segundo más importante",
        "Elija el tercer más importante",
        $scope.answers.s3.p5
    ];
 
    }

     vm.open = function($event) {
    vm.status.opened = true;
  };
    vm.panelTitle =  $scope.sessions["s1"].title;
    vm.setTitle = function(title){
      
      vm.panelTitle = title;

    };

    vm.changePage = function(page){
      //obtener tab activ y el indice
      var active = vm.tabActive();
      var index = $.inArray( active, vm.pages ); 
 

      if(index === 0 && page === -1){
        vm.page = vm.pages.length-1;
        vm.pages[vm.page].active = true;
        vm.panelTitle =  $scope.sessions[vm.pages[vm.page].key].title;
        return true;
      }

      if(index == (vm.pages.length  - 1) && page == 1){
        vm.page = 0;
        vm.pages[vm.page].active = true;
        vm.panelTitle =  $scope.sessions[vm.pages[vm.page].key].title;
        return true;
      }

      vm.page = index + page;
      vm.pages[vm.page].active = true;
      vm.panelTitle =  $scope.sessions[vm.pages[vm.page].key].title;
     
    //actualizar en db
    //if(characterizationsAnswers.setAnswers($scope.user_id, $scope.answers)){}
    };

    vm.tabActive = function() {
        return vm.pages.filter(function(pane){
          return pane.active;
        })[0];
    };
    vm.save =  function(){
      vm.saveStatus = "saved";
    };






  }


 
})();
