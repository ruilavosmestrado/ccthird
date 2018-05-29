'use strict';

$('#signInButton').on('click', function(event) {

  var postData = {
      username: $("#username").val(),
      password: $("#password").val()
  };

  let axiosConfig = {
      headers: {
          "Content-Type": "application/json"
      },
      crossdomain: true
  };

  axios.post('http://localhost:8080/user/login', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      $(location).attr('href', 'messageboard.html');
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
});