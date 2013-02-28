define(['lib/Base64'], function (Base64) {
  function backendServiceFactory($http, $q, $waitDialog) {
    var defaultErrorCodeMessageMapping = {
      401:'Zugriff verweigert.',
      0:'Ein unbekannter Fehler ist aufgetreten.'
    };

    var backendBaseUri = '/json';

    var carTypesPromise, citiesPromise, authorizationHeader, _authenticationCustomer, _username, _password;

   

    function loadConversations() {
      return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
        url:backendBaseUri,
        method:'GET',
        headers:{
          'Authorization':authorizationHeader
        },
        params: {payload: {
  		  "service": "com.entarena.comm.conversation/load-conversations-json", 
  		  "payload": [{"special": "all"}],
  		  "email": _username, 
  		  "passwd": _password 
  			  }}
      })));
    }

    function loadConversationbyId(conversationId) {
        return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
          url:backendBaseUri,
          method:'GET',
          headers:{
            'Authorization':authorizationHeader
          },
          params: {payload: {
    		  "service": "com.entarena.comm.conversation/load-conversation-json", 
    		  "payload": [conversationId],
    		  "email": _username, 
    		  "passwd": _password 
    			  }}
        })));
      }
    
    function loadBankDetails(bankId) {
        return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
          url:backendBaseUri,
          method:'GET',
          headers:{
            'Authorization':authorizationHeader
          },
          params: {payload: {
    		  "service": "com.dlh.bis.server/getBankData", 
    		  "payload": [bankId],
    		  "email": _username, 
    		  "passwd": _password 
    			  }}
        })));
      }
    
    function loadProfilebyId(profileId) {
        return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
          url:backendBaseUri,
          method:'GET',
          headers:{
            'Authorization':authorizationHeader
          },
          params: {payload: {
    		  "service": "com.entarena.profile/profile-by-id", 
    		  "payload": [profileId],
    		  "email": _username, 
    		  "passwd": _password 
    			  }}
        })));
      }
    
    
    function loadBanks() {
        return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
          url:backendBaseUri,
          method:'GET',
          headers:{
            'Authorization':authorizationHeader
          },
          params: {payload: {
    		  "service": "com.dlh.bis.server/getBankList", 
    		  "payload": [true, false, false],
    		  "email": _username, 
    		  "passwd": _password 
    			  }}
        })));
      }
    
    
    function customerByUsername(username) {
      return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
        url:backendBaseUri,
        method:'GET',
        headers:{
          'Authorization':authorizationHeader
        },
        params: {payload: {
  		  "service": "com.entarena.session/login", 
  		  "payload": [_username, _password],
  		  "email": _username, 
  		  "passwd": _password 
  			  }}
      })));
    }



    function setCredentials(username, password) {
      authorizationHeader = "Basic " + Base64.encode(username + ':' + password);
      _username = username;
      _password = password;
    }
    
    
    function announce(p_subject, p_text) {
        var errorCodeMapping = {
          409:"Announcement not successfull"
        };
        return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
          url:backendBaseUri,
          method:'GET',
          headers:{
            'Authorization':authorizationHeader
          },
          params: {payload: {
      		  "service": "com.entarena.comm.conversation/announce", 
      		  "payload": [p_subject, p_text],
      		  "email": _username, 
      		  "passwd": _password 
      			  }}
        }), errorCodeMapping));
      }
    

    function login(username, password) {
      setCredentials(username, password);
      return customerByUsername(username).then(function (data) {
        return _authenticationCustomer = data;
      }, function (data) {
    	 _authenticationCustomer = "failure";  
        return $q.reject(data);
      });
      
    }

    function authenticatedCustomer() {
      return _authenticationCustomer;
    }

    function logout() {
      var url = location.href;
      var lastSlash = url.lastIndexOf('/');
      location.href = url.substring(0, lastSlash) + '/index.html';
    }

    function showWaitDialogWhile(promise) {
      $waitDialog.show();
      return promise.then(function (response) {
        $waitDialog.hide();
        return response;
      }, function (response) {
        $waitDialog.hide();
        return $q.reject(response);
      });
    }

    function unpackPromiseAndHandleErrorCodes(promise, errorCodeMessageMapping) {
      return promise.then(function (response) {
        if (response.data == "null")
        	return $q.reject("Json Error");
        else
        	return response.data;
      }, function (response) {
        var errorCode = response.status;
        var errorMessage;
        if (errorCodeMessageMapping) {
          errorMessage = errorCodeMessageMapping[errorCode];
        }
        if (!errorMessage) {
          errorMessage = defaultErrorCodeMessageMapping[errorCode];
        }
        if (!errorMessage) {
          errorMessage = defaultErrorCodeMessageMapping[0];
        }

        return $q.reject(errorMessage);
      });
    }

    return {
      loadConversations:loadConversations,
      loadConversationbyId:loadConversationbyId,
      loadBankDetails:loadBankDetails,
      loadProfilebyId:loadProfilebyId,
      loadBanks:loadBanks,
      customerByUsername:customerByUsername,     
      announce:announce,
      login:login,
      setCredentials:setCredentials,
      authenticatedCustomer:authenticatedCustomer,
      logout:logout
    }
  }

  backendServiceFactory.$inject = ["$http", "$q", "$waitDialog"];

  return backendServiceFactory;
});