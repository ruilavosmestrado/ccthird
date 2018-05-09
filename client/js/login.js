'use strict';

const instance = axios.create();

$('#signInButton').on('click', function(event) {
	//event.preventDefault();
	/* Act on the event */
	console.log('ola');

	instance.get('localhost:3000/').catch(function(error) {
  		if (!error.status) {
    		console.log('e: ' + error.response);
  		}
	});
	/*axios.get('/', {
		proxy: {
    		host: '127.0.0.1',
    		port: 3000,
  		}
	});*/

	/*axios({
  		method: 'get',
  		url: '/',
  		proxy: {
    		host: '127.0.0.1',
    		port: 3000,
  		},
  		responseType: 'stream'
	});*/
});

/*axios.get('/')
	.then(function (response) {
	    console.log(response);
  	})
  	.catch(function (error) {
    	console.log(error);
  	});*/