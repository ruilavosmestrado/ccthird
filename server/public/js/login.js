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

  //axios.post('http://ec2-52-51-205-247.eu-west-1.compute.amazonaws.com/user/login', postData, axiosConfig)
  axios.post('http://localhost:3000/user/login', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user',  JSON.stringify(res.data.user));
      $(location).attr('href', 'messageboard.html');
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
});