define(['lib/Base64'], function (Base64) {
  function backendServiceFactory($http, $q, $waitDialog) {
    var defaultErrorCodeMessageMapping = {
      401:'Zugriff verweigert.',
      0:'Ein unbekannter Fehler ist aufgetreten.'
    };

    var backendBaseUri = '/json';
    var counter=0;

    var carTypesPromise, citiesPromise, authorizationHeader, _authenticationCustomer, _username, _password;

  
    
    function loadConversations(_filter_code) {
      return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
        url:backendBaseUri,
        method:'GET',
        headers:{
          'Authorization':authorizationHeader
        },
        params: {payload: {
  		  "service": "com.entarena.comm.conversation/load-conversations-json", 
  		  "payload": [_filter_code],
  		  "email": _username, 
  		  "passwd": _password 
  			  }}
      })));
    }

    function loadConversationbyId(conversationId) {
    	counter = counter +1;
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
    			  },
    			  counter: counter}
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
    
    
    function loadRecipients() {
        return showWaitDialogWhile(unpackPromiseAndHandleErrorCodes($http({
          url:backendBaseUri,
          method:'GET',
          headers:{
            'Authorization':authorizationHeader
          },
          params: {payload: {
    		  "service": "com.entarena.comm.lookup/lookup", 
    		  "payload": [{}],
    		  "email": _username, 
    		  "passwd": _password 
    			  }}
        })));
      }
    
   
    function comment(p_conversation_id, p_text) {
  //  	alert("p_conversation_id: "+ p_conversation_id);
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
      		  "service": "com.entarena.comm.message/post-message", 
      		  "payload": [p_conversation_id, p_text],
      		  "email": _username, 
      		  "passwd": _password 
      			  }}
        }), errorCodeMapping));
      }
    
    
    /// to announce p_audience has to be null
    
    function new_message(p_subject, p_text, p_audience) {
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
      		  "payload": [p_subject, p_text, p_audience],
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
        var errorMessage = "error";
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
      loadProfilebyId:loadProfilebyId,
      customerByUsername:customerByUsername,     
      loadRecipients:loadRecipients,
      comment:comment,
      new_message:new_message,
      login:login,
      setCredentials:setCredentials,
      authenticatedCustomer:authenticatedCustomer,
      logout:logout
    };
  }

  backendServiceFactory.$inject = ["$http", "$q", "$waitDialog"];

  return backendServiceFactory;
});