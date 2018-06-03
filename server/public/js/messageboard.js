'use strict';

$(document).ready(function() {

	console.log(localStorage.getItem('token'));

	if (localStorage.getItem('token') == null) {
		$(location).attr('href', 'login.html');
	} 
    
  	let axiosConfig = {
      	headers: {
          	"Content-Type": "application/json",
          	'Authorization': "Bearer " + localStorage.getItem('token')
      	},
      	crossdomain: true
  	};

  	axios.get('http://localhost:3000/messages/', axiosConfig)
    	.then((res) => {
      		console.log("RESPONSE RECEIVED: ", res);
      		//$(location).attr('href', 'messageboard.html');
    	})
    	.catch((err) => {
    		console.log('ruie');
      		console.log("AXIOS ERROR: ", err);
    	});
});

$('#envio').on("submit", function(event) {
	event.preventDefault();

	//console.log('submit message', $("#msgimg").file[0]);

	// post new message
	var postData = {
      	userid: JSON.parse(localStorage.getItem('user')),
      	datetime: new Date(),
      	text: $("#msgtext").val(),
      	img: $("#msgimg").val(),
  	};

  	let axiosConfig = {
      	headers: {
          	"Content-Type": "application/json",
          	'Authorization': "Bearer " + localStorage.getItem('token')
      	},
      	crossdomain: true
  	};

  	axios.post('http://localhost:3000/messages/create/', postData, axiosConfig)
    	.then((res) => {
      		console.log("RESPONSE RECEIVED: ", res);

      		/*
				<li class="left clearfix"><span class="chat-img pull-left">
                            <img src="img_photo/522.jpg" alt="User Avatar" class="img-circle" />
                        </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">Mike Gulvishvokov</strong> <small class="pull-right text-muted">
                                        <span class="glyphicon glyphicon-time"></span> 2 mins ago</small>
                                </div>
                                <p>
                                      Lorem xercitation 
                                      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </li>
      		*/

      		//$(location).attr('href', 'messageboard.html');
    	})
    	.catch((err) => {
    		console.log('ruie2');
      		console.log("AXIOS ERROR: ", err);
    	});

	// get all messages
});