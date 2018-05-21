'use strict';

$('#signInButton').on('click', function(event) {

  var postData = {
      email: $("#username").val(),
      password: $("#password").val()
  };

  let axiosConfig = {
      headers: {
          "Content-Type": "application/json"
      },
      crossdomain: true
  };

  axios.post('http://localhost:3000/user/login', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
});