'use strict';

$(document).ready(function() {
	var username = JSON.parse(localStorage.getItem('user'));
	console.log("username " + username);

    var postData = {
    	username: username,
    };
	
	let axiosConfig = {
      headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + localStorage.getItem('token')
      },
      crossdomain: true
  	};

 	axios.post('http://loadbalancerrui2-1532324241.eu-west-1.elb.amazonaws.com/user/myFriends', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      console.log(res.data.data);

      res.data.data.forEach(function(user){
          console.log(user);

        $(".chatMyFriends").append(
						'<li class="left clearfix"><span class="chat-img pull-left">' +
                            '<img src="img_photo/unknown.png" alt="User Avatar" class="img-circle" />' +
                        '</span>' +
                            '<div class="userlist-body clearfix">' +
                                '<div class="header headername">' +
                                    '<strong class="primary-font">' + user.userid2 + '</strong>' +
                                '</div>' +
                                '<div class="buttonRight">' +
                                    '<a href="profile.html" type="button"  class="btn btn-md btn-info"><span class="glyphicon glyphicon-option-horizontal"></span></a>' +
                                    '<button type="button" class="btn btn-md btn-danger">' +
                                      '<span class="glyphicon glyphicon-minus"></span>' +
                                    '</button>' +                                    
                                '</div>' +
                            '</div>' +
                        '</li> ')
      });
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });

  axios.post('http://loadbalancerrui2-1532324241.eu-west-1.elb.amazonaws.com/user/friendRequests', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      console.log(res.data.data);

      res.data.data.forEach(function(user){
          console.log(user);

        $(".chatFriendRequest").append(
            '<li class="left clearfix"><span class="chat-img pull-left">' +
                            '<img src="img_photo/unknown.png" alt="User Avatar" class="img-circle" />' +
                        '</span>' +
                            '<div class="userlist-body clearfix">' +
                                '<div class="header headername">' +
                                    '<strong class="primary-font">' + user.userid1 + '</strong>' +
                                '</div>' +
                                '<div class="buttonRight">' +
                                    '<a href="profile.html" type="button"  class="btn btn-md btn-info"><span class="glyphicon glyphicon-option-horizontal"></span></a>' +
                                    '<button type="button" class="btn btn-md btn-success">' +
                                      '<span class="glyphicon glyphicon-plus"></span>' +
                                    '</button>' +
                                    '<button type="button" class="btn btn-md btn-danger">' +
                                      '<span class="glyphicon glyphicon-minus"></span>' +
                                    '</button>' +                                    
                                '</div>' +
                            '</div>' +
                        '</li> ')
      });
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });

});