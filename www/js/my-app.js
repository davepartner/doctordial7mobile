// Initialize your app
var myApp = new Framework7(
{
	pushState: 0,
	swipeBackPage: true,
   // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
    
    preroute: function (mainView, options) {
    	
    }
    
 });

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    domCache: true,
});





function createUserAccount(formData){
	var ref = new Firebase("https://doctordial.firebaseio.com");
ref.createUser(formData,

 function(error, userData) {
  if (error) {
    myApp.alert("Error creating account:"+error.message, error);
  } else {
    //alert("Successfully created user account with uid:", userData.uid);
    alert("Successfully created account. Please login");
    mainView.router.loadPage('login-screen-page.html'); //load another page with auth form
  }
});
}


function loginFire(sentEmail,sentPassword){ //get this login from database 
	var ref = new Firebase("https://doctordial.firebaseio.com");
ref.authWithPassword({
  email    : sentEmail,
  password : sentPassword
}, function(error, authData) {
  if (error) {
  	
  	myApp.alert("Error loging in, if you are sure you are registered, please try again or use the forgot password feature", "Incorrect Login");
    mainView.router.loadPage('login-screen-page.html'); //load another page with auth form
    return false; //required to prevent default router action
  } else {
  	localStorage.user_id = authData.uid;
  	//save data in local variablable
  	// Store
//localStorage.setItem(authData); //save in the local storage
     //myApp.alert("Login successful", authData);
     myApp.alert("Login successful ", 'Success!');
    //mainView.router.loadPage('index.html'); //load another page with auth form
  }
});

}

function changeEmail(){
	var ref = new Firebase("https://doctordial.firebaseio.com");
ref.changeEmail({
  oldEmail : "bobtony@firebase.com",
  newEmail : "bobtony@google.com",
  password : "correcthorsebatterystaple"
}, function(error) {
  if (error === null) {
    console.log("Email changed successfully");
  } else {
    console.log("Error changing email:", error);
  }
});
}

function changePassword(){
	var ref = new Firebase("https://doctordial.firebaseio.com");
ref.changePassword({
  email       : "bobtony@firebase.com",
  oldPassword : "correcthorsebatterystaple",
  newPassword : "neatsupersecurenewpassword"
}, function(error) {
  if (error === null) {
    console.log("Password changed successfully");
  } else {
    console.log("Error changing password:", error);
  }
});
}

function sendPasswordResetEmail(recoveryEmail){ 
//You can edit the content of the password reset email from the Login & Auth tab of your App Dashboard.
	var ref = new Firebase("https://doctordial.firebaseio.com");
ref.resetPassword({
  email : recoveryEmail
}, function(error) {
  if (error === null) {
    console.log("Password reset email sent successfully");
  } else {
    console.log("Error sending password reset email:", error);
  }
});
}

function deleteUser(){
	var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
ref.removeUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error) {
  if (error === null) {
    console.log("User removed successfully");
  } else {
    console.log("Error removing user:", error);
  }
});
}


myApp.onPageInit('login-screen', function (page) {
	
checkLoggedIn();
	
	
  var pageContainer = $$(page.container);
  pageContainer.find('.list-button').on('click', function () {
   // var email = pageContainer.find('input[name="email"]').val();
    var formData = myApp.formToJSON('#signupForm'); //convert submitted form to json.
  //myApp.alert(formData);
  
  //send to database
  //var formDataString = JSON.stringify(formData);
  createUserAccount(formData); //do the registration and report errors if found
  
    
    // Handle username and password
   /* myApp.alert('Email: ' + email + ', Password: ' + password, function () {
      mainView.goBack();
    });
    */
    
    //loginFire(email, password); //login
  });
  
  
  //recoveryEmail
  pageContainer.find('.login-button').on('click', function () {
  	var email = pageContainer.find('input[name="email"]').val();
  	var password = pageContainer.find('input[name="password"]').val();
  loginFire(email, password);
  });
  
  
  //checkLoggedIn();
  
});    


// Create a callback which logs the current auth state
function checkLoggedIn(authData) {
  if (authData) {
    //console.log("User " + authData.uid + " is logged in with " + authData.provider);
    mainView.router.back();
  } else {
    console.log("User is logged out");
    myApp.alert("You are not logged in, please login", "Please Login");
			mainView.router.loadPage("login-screen-page.html");
  }
}
// Register the callback to be fired every time auth state changes
var ref = new Firebase("https://doctordial.firebaseio.com");
ref.onAuth(checkLoggedIn);





$$(document).on('pageInit', function (e) {
	
    	
       //ruun login function
	//messages must be initialized here
  
});
// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

 myApp.onPageInit('messages_view', function(page) {




// Conversation flag
var conversationStarted = false;

try{
var myMessages = myApp.messages('.messages', {
  autoLayout:true
});
}catch(err1){
	alert("As you can see: "+err1.message);
}

 var myMessagebar = myApp.messagebar('.messagebar', {
    maxHeight: 150
});  

// Do something here when page loaded and initialized
	//var scrolled = 0;
			  // CREATE A REFERENCE TO FIREBASE
			  var messagesRef = new Firebase('https://doctordial.firebaseio.com/messages');

			  // REGISTER DOM ELEMENTS
			  var messageField = $$('#messageInput');
			  var nameField = $$('#nameInput');
			  var messageList = $$('.messages');
			  var sendMessageButton = $$('#sendMessageButton');

			  // LISTEN FOR KEYPRESS EVENT
			/*  sendMessageButton.click(function (e) {
			      //FIELD VALUES
			      var username = nameField.val();
			      var message = messageField.val();
                  messageField.val('');
			      if(message != ''){
			      	 
			      //SAVE DATA TO FIREBASE AND EMPTY FIELD
			      messagesRef.push({name:username, text:message});
			      
			      }
			     
			   
			  });*/
			  
			  
							  
				// Init Messagebar
				var myMessagebar = myApp.messagebar('.messagebar');
				 
				// Handle message
				$$('.messagebar .link').on('click', function () {
					
				  // Message text
				  var messageText = myMessagebar.value().trim();
				  // Exit if empy message
				  if (messageText.length === 0) return;
				 
				  // Empty messagebar
				  myMessagebar.clear()
				 
				  
				 var name = nameField.val(); 
				 //SAVE DATA TO FIREBASE AND EMPTY FIELD
			     // messagesRef.push({name:name, text:messageText});
				  // Avatar and name for received message
				 // var avatar;
				  
			
			  
				
				  // Add message
				  messagesRef.push({
				  	//userid
				  	user_id: localStorage.user_id, 
				    // Message text
				    text: messageText,
				    // Random message type
				    // Avatar and name:
				    //avatar: avatar,
				    name: name,
				    // Day
				    day: !conversationStarted ? 'Today' : false,
				    time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
				  })
				  
				
				  // Update conversation flag
				  conversationStarted = true;
				});                


			  // Add a callback that is triggered for each chat message.
			  messagesRef.limitToLast(10).on('child_added', function (snapshot) {
			    //GET DATA
			    var data = snapshot.val();
			    var username = data.name || "anonymous";
			    var message = data.text;
			    
			    if(localStorage.user_id == data.user_id){ //if this is the sender
					 var messageType = 'sent';
			   }else{
			   	     var messageType = 'received';
			   }
			    var day = data.day;
			    var time = data.time;
			    
			    

			    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
			   // var messageElement = $$('<div class="message message-'+messageType+'"><div class="message-text">');
			   // var nameElement = $$("<strong class='example-chat-username'></strong>");
			    
			    var newMessageContent =     '<div class="message message-sent">'+
									        '<div class="message-text">'+message+'</div>'+
									        '</div>';
			    //$$(newMessageContent ).insertAfter( ".message" );
			    
			   // nameElement.text(username+" ");
			   // messageElement.text(message).prepend(nameElement);
          

			    //SCROLL TO BOTTOM OF MESSAGE LIST
			   // messageList[0].scrollTop = messageList[0].scrollHeight;
			      // Add message
			     
				try{
					myMessages.addMessage({
				  	
				    // Message text
				    text: message,
				    // Random message type
				    type: messageType,
				    // Avatar and name:
				    //avatar: avatar,
				    name: name,
				    // Day
				    day: !conversationStarted ? 'Today' : false,
				    time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
				  });
				}catch(err){
					//alert("got the error"+err);
				}
				  
				  
				  
				  
			  });

}).trigger();

