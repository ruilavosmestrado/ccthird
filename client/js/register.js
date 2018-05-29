'use strict';

$('#signUpButton').on('click', function(event) {

	let axiosConfig = {
      	headers: {
          	"Content-Type": "application/json"
      	},
      	crossdomain: true
  	};

  	var username = $("#username").val();
  	var name = $("#name").val();
  	var password = $("#password").val();
  	var confirm = $("#password2").val();

  	var postData = {
      	username: username,
      	name: name,
   		password: password
	};

  	axios.post('http://localhost:8080/user/signup', postData, axiosConfig)
    	.then((res) => {
      		console.log("RESPONSE RECEIVED: ", res);
          //window.location.assign("../messageboard.html");
          //window.open("../messageboard.html",'_self');
          //window.location.replace("../messageboard.html");
          //window.location.href = "messageboard.html";
          $(location).attr('href', '../messageboard.html');
          return false;
    	})
    	.catch((err) => {
      		console.log("AXIOS ERROR: ", err);
    	});
});