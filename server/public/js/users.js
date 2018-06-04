'use strict';

$(document).ready(function() {
	var username = JSON.parse(localStorage.getItem('user'));
	console.log("username " + username);

	let axiosConfig = {
      headers: {
          "Content-Type": "application/json"
      },
      crossdomain: true
 	};

	axios.get('http://localhost:3000/user/all', axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      console.log(res.data);

		res.data.data.forEach(function(user){
      		console.log(user);

	    	$(".chat").append(
 						'<li class="left clearfix"><span class="chat-img pull-left">' +
                            '<img src="' + user.img_photo + '" alt="User Avatar" class="img-circle" />' +
                        '</span>' +
                            '<div class="userlist-body clearfix">' +
                                '<div class="header headername">' +
                                    '<strong class="primary-font">' + user.name + '</strong>' +
                                '</div>' +
                                '<div class="buttonRight">' +
                                    '<a href="profile.html" type="button"  class="btn btn-md btn-info"><span class="glyphicon glyphicon-option-horizontal"></span></a>' +
                                    '<button type="button" class="btn btn-md btn-success">' +
                                      '<span class="glyphicon glyphicon-plus"></span>' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</li>')
      	});
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });

});

$('#searchForm').on('submit', function(event) {
	event.preventDefault();

	console.log("searchButton");

	var postData = {
    	username: $("#username").val(),
    };
	
	let axiosConfig = {
      headers: {
          "Content-Type": "application/json"
      },
      crossdomain: true
  };

  //console.log("username " + $("#username").val());

  axios.post('http://localhost:3000/user/searchUser', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
      console.log(res.data.data);

      $(".chat").children("li").remove();
      $(".chat").append(
 						'<li class="left clearfix"><span class="chat-img pull-left">' +
                            '<img src="' + res.data.data[0].img_photo + '" alt="User Avatar" class="img-circle" />' +
                        '</span>' +
                            '<div class="userlist-body clearfix">' +
                                '<div class="header headername">' +
                                    '<strong class="primary-font">' + res.data.data[0].name + '</strong>' +
                                '</div>' +
                                '<div class="buttonRight">' +
                                    '<a href="profile.html" type="button"  class="btn btn-md btn-info"><span class="glyphicon glyphicon-option-horizontal"></span></a>' +
                                    '<button type="button" class="btn btn-md btn-success">' +
                                      '<span class="glyphicon glyphicon-plus"></span>' +
                                    '</button>' +
                                '</div>' +
                            '</div>' +
                        '</li>')

    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });

});