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

  	//axios.get('http://ec2-52-51-205-247.eu-west-1.compute.amazonaws.com/messages/', axiosConfig) //server
  	axios.get('http://localhost:3000/messages/', axiosConfig) //local
    	.then((res) => {
      		console.log("RESPONSE RECEIVED: ", res);

      		res.data.messages.forEach(function (mes) {
      			console.log('rui', mes);
      			$(".chat").append( '<li class="left clearfix"><span class="chat-img pull-left">' +
                            				'<img src="img_photo/522.jpg" alt="User Avatar" class="img-circle" />' +
                        					'</span>' +
                            					'<div class="chat-body clearfix">' +
                                					'<div class="header">' +
                                    					'<strong class="primary-font">' + mes.userid + '</strong> <small class="pull-right text-muted">' +
                                        				'<span class="glyphicon glyphicon-time"></span>' + mes.datetime + '</small>' +
                                					'</div>' +
                                					'<p>' +
                                     					mes.text +
                                					'</p>' +
                            					'</div>' + 
                            					'<div class="chat-msgimg">' +
                              						'<a href="original_image.html"><img src="' + mes.img + '" alt="Image associated to message number 32467"></a>' +
                            					'</div>' +
                        				'</li>');
      		});
      				

      		
      		//$(location).attr('href', 'messageboard.html');
    	})
    	.catch((err) => {
    		console.log('ruie');
      		console.log("AXIOS ERROR: ", err);
    	});
});

$('#envio').on("submit", function(event) {
	event.preventDefault();

	var reader;
	var img;

	let axiosConfig = {
      	headers: {
          	"Content-Type": "application/json",
          	'Authorization': "Bearer " + localStorage.getItem('token')
      	},
      	crossdomain: true
  	};

	if (document.getElementById("msgimg").files.length > 0) {
		console.log('yey');
		reader = new FileReader();
		reader.readAsDataURL(document.getElementById('msgimg').files[0]);
		reader.onload = function () {
			var postData = {
      			userid: JSON.parse(localStorage.getItem('user')),
      			datetime: new Date(),
      			text: $("#msgtext").val(),
      			img: JSON.stringify(reader.result)
  			};

  			//axios.post('http://ec2-52-51-205-247.eu-west-1.compute.amazonaws.com/messages/create/', postData, axiosConfig)
  			axios.post('http://localhost:3000/messages/create/', postData, axiosConfig)
    			.then((res) => {
      				console.log("RESPONSE RECEIVED: ", res);

      				
    			})
    			.catch((err) => {
    			console.log('ruie2');
      			console.log("AXIOS ERROR: ", err);
    		});
		}
	} else {
		// post new message
		var postData = {
      		userid: JSON.parse(localStorage.getItem('user')),
      		datetime: new Date(),
      		text: $("#msgtext").val(),
      		img: null
  		};

  		//axios.post('http://ec2-52-51-205-247.eu-west-1.compute.amazonaws.com/messages/create/', postData, axiosConfig)
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
	}

	
});