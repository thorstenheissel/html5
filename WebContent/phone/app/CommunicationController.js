define(function () {
  function CommunicationController($scope, backendService, $navigate) {

    $scope.loadConversations = function () {
      if ($scope.filter == null) 
    	  {
    	  $scope.filter = "All Conversations";
    	  $scope.filter_code = {"special": "all"};
    	  }
      var res = backendService.loadConversations($scope.filter_code);
      res.then(function (data) {
        $scope.rentals = data;
      }, function (errorMessage) {
        $scope.errorMessage = errorMessage;
      });
      return res;
    };
    
    $scope.loadRecipients = function () {
        var res = backendService.loadRecipients();
        res.then(function (data) {
          $scope.recipient_list = data;
       
        }, function (errorMessage) {
          $scope.errorMessage = errorMessage;
        });
        return res;
      };
      
  $scope.addRecipient = function (_recipient) {
//	  alert("add Reciepient");
	  if($.inArray(_recipient, $scope.selected_recipients) == -1) $scope.selected_recipients.push(_recipient);
//	  alert($scope.selected_recipients);
	  $( "#addRecipient" ).popup( "close" );
    };     
    
    $scope.loadConversationsFor = function (_filter) {
       $scope.filter = _filter;
   //    alert("navigate")
       
       if ($scope.filter == "All Conversations") $scope.filter_code = {"special": "all"};
       if ($scope.filter == "Announcement") $scope.filter_code = {"special": "public"};
       if ($scope.filter == "Private Conversations") $scope.filter_code = {"special": "personal"};
       if ($scope.filter == "All Conversations I started") $scope.filter_code = {"special": "own"};   
       
       $navigate('#conversations');
      };
      
      $scope.show_post_Message = function (_mode) {
         $scope.postMessageMode = _mode;
         if (_mode == 1) $scope.selected_recipients = [];
         	else
         		$scope.selected_recipients = null;
 //        alert("navigate to postMessage "+_mode)
          $navigate('#postMessage');
         };
    
    $scope.showDetails = function (_id) {
 //   	alert("load Conversation for: " + _id);
    	$scope.headertext=_id;
    	
    	var res = backendService.loadConversationbyId(_id);
        res.then(function (data) {
          $scope.conversation = data;
        }, function (errorMessage) {
          $scope.headertext = errorMessage;
        });
    	
    	
    	$navigate('#conversation');
    	return res;
      };

    $scope.comment = function () {
 //   	alert("Id:"+ $scope.conversation.conversation._id);
 //   	alert("Message:"+$scope.messageText);
    	return backendService.comment($scope.conversation.conversation._id, $scope.messageText).then(
    	        function (rental) {
    	           $scope.successMessage = "message posted";
    	           $scope.showDetails($scope.conversation.conversation._id);
    	        }, function (errorMessage) {
    	          $scope.errorMessage = errorMessage;
    	          $navigate('#conversations');
    	        });
      	
        };

    $scope.post_Message = function () {
    	 //   	alert("Id:"+ $scope.conversation.conversation._id);
    	 //   	alert("Message:"+$scope.messageText);
    	    	return backendService.new_message($scope.messageSubject, $scope.messageText, $scope.selected_recipients).then(
    	    	        function (rental) {
    	    	           $scope.successMessage = "message posted";
    	    	           $navigate('#conversations');
    	    	        }, function (errorMessage) {
    	    	          $scope.errorMessage = errorMessage;
    	    	          $navigate('#conversations');
    	    	        });
    	      	
    	        };
    

    $scope.infoMessage = function () {
      if ($scope.rentals && $scope.rentals.length === 0) {
        return "Keine Daten gefunden.";
      } else {
        return null;
      }
    };

  }

  CommunicationController.$inject = ['$scope', 'backendService', '$navigate'];

  return CommunicationController;
});