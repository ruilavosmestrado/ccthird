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

  	/*if (password !== confirm) {
      	//erro
  	} else {
    	var postData = {
      		username: username,
      		name: name,
      		password: password
  		};
  	}	*/

  	axios.post('http://localhost:3000/user/signup', postData, axiosConfig)
    	.then((res) => {
      		console.log("RESPONSE RECEIVED: ", res);
    	})
    	.catch((err) => {
      		console.log("AXIOS ERROR: ", err);
    	});
});