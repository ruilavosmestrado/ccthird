'use strict';

$('#signInButton').on('click', function(event) {

  var postData = {
      username: $("#username").val(),
      password: $("#password").val()
  };//rui

  let axiosConfig = {
      headers: {
          "Content-Type": "application/json"
      },
      crossdomain: true
  };

  axios.post('http://ec2-52-51-205-247.eu-west-1.compute.amazonaws.com/user/login', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      $(location).attr('href', 'messageboard.html');
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
});