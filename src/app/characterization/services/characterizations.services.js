(function() {
  'use strict';

  angular
    .module('InnovationManagement')
    .factory('characterizationsAnswers', characterizationsAnswers);

  /** @ngInject */
  function characterizationsAnswers($log, $http) {
    var apiHost = 'http://surveyapi.herokuapp.com/characterizations';
    
    var answers = {
       s1: {
        p1: "",
        p2: "",
        p3: "",
        p4: ""

       },
       s2: {
        p1: "",
        p2: "",
        p3: "",
        p4: "",
        p5: ""

       },
       s3: {
          p1: "",
          p2: "",
          p3: "",
          p4: "",
          p5:  "",
          p6:  "",
          p7:  ""
       },
       s4: {
           p1: "",
           p2: "",
           p3: ""
       },
       s5: {
           p1: "",
           p2: "",
           p3: ""
       },
       s6: {
           p1: "",
           p2: "",
           p3: ""
       },
       s7: {
           p1: "",
           p2: "",
           p3: "",
           p4: "",
           p5: ""

       },
       s8: {

           p1: "",
           p2: "",
           p3: "",
           p4: "",
           p5: "",
           p6: "",
           p7: "",
           p8: "",
           p9: "",
           p10: "",
           p11: "",
           p12: ""
       },
       s9: {
           p1: "",
           p2: "",
           p3: "",
           p4: "",
           p5: "",
           p6: "",
           p7: "",
           p8: "",
           p9: "",
           p10: "",
           p11: "",
           p12: "",
           p13: "",
           p14: ""
       },
       s10: {
           p1: "",
           p2: "",
           p3: "",
           p4: "",
           p5: "",
           p6: "",
           p7: "",
           p8: "",
           p9: "",
           p10: "",
           p11: "",
           p12: "",
           p13: ""
       },
              s11: {
           p1: "",
           p2: "",
           p3: "",
           p4: "",
           p5: "",
           p6: "",
           p7: "",
           p8: "",
           p9: "",
           p10: "",
           p11: "",
           p12: "",
           p13: "",
           p14: "",
           p15: "",
           p16: "",
           p17: "",
           p18: "",
           p19: "",
           p20: "",
           p21: "",
           p22: "",
           p23: "",
           p24: "",
           p25: ""

       }


   };
    var service = {
      apiHost: apiHost,
      getAnswers: getAnswers,
      setAnswers: setAnswers,
      getAnswers2: getAnswers2,
      getInSessions:getInSessions,
      getEmptyAnswers:getEmptyAnswers
    };

    return service;
        function getEmptyAnswers() {
   
   
     return answers;
       

      

      function getAnswersComplete(response) {
        return response.data;
      }

      function getAnswersFailed(error) {
        $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
      }
    }

    function getAnswers(id) {
   
   
     return $http.get(apiHost+"?"+"user_id=" + id)
        .then(getAnswersComplete)
        .catch(getAnswersFailed);
       

      

      function getAnswersComplete(response) {
        return response.data;
      }

      function getAnswersFailed(error) {
        $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
      }
    }

    function getInSessions(data) {
   //var data = {characterization:{user_id:5}}
   var index = 1;
    angular.forEach(answers, function(session, skey) {
      angular.forEach(session, function(pnv,pnk){
        answers[skey][pnk] = data["p"+index];
        index++;

      });

    });
   
     return answers;
       

   
    }
        function getAnswers2(id) {
   


     return $http.get(apiHost+"?"+"user_id=" + id)
        .then(getAnswersComplete)
        .catch(getAnswersFailed);
       

      function getAnswersComplete(response) {
        return response.data;
      }

      function getAnswersFailed(error) {
        $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
      }
    }

     function setAnswers(user_id, answers_new) {
var data = {characterization:{user_id:user_id}}
var index = 1;
  angular.forEach(answers_new, function(session, skey) {
    angular.forEach(  session, function(pnv,pnk){
      data.characterization["p"+index] = pnv || "";
      index++;

    });

  });


      return  $http.post(apiHost, data).
              then(getAnswersComplete, getAnswersFailed);

        
      function getAnswersComplete(response) {
        return response.data;
      }

      function getAnswersFailed(error) {
        $log.error('XHR Failed for getAnswers.\n' + angular.toJson(error.data, true));
      }
    }

  }
})();
