//const mongoose = require("mongoose");
/*const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');*/
const config = require('../../config/DB');
const AWS = require("aws-sdk");

AWS.config.update({accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: "eu-west-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

const messageTable = "message";
const friendTable = "friend";

exports.get_messages = (req, res, next) => {
	friendsAndUser = [];
	messages = [];

	if (!req.userData) {
    	res.status(500).json({error: 'err1'});
    	return;
	}

	/*var paramsFriendIsFirst = {
      	TableName : messageTable,
      	KeyConditionExpression: "userid2 = :username",
      	ExpressionAttributeValues: {
         	":username":req.userData.username
      	}
  	};*/

  	var paramsFriend = {
      	TableName : friendTable
  	};

  	docClient.scan(paramsFriend, function(err, data) {
    	if (err) {
          	res.status(500).json({error: err}); 
    	} else {
        	console.log("Query succeeded.");
        	if(data.Items.length > 0) {
        		data.Items.forEach(function(item) {
            		console.log(item);

            		if (item.userid2 == req.userData.username) {
            			friendsAndUser.push(item.userid1);
            		} else if (item.userid1 == req.userData.username) {
            			friendsAndUser.push(item.userid2);
            		}

            		friendsAndUser.push(req.userData.username);
        		});

        		if (friendsAndUser.length <= 1) {
            		//res.status(201).json({message: "Found Friends"});
            		friendsAndUser = [];
            		res.status(500).json({error: 'No friends for You!'});
            	}
        	} else {
            	res.status(500).json({error: 'No friends available'}); 
        	}
    	}
	});


	var paramsMessage = {
      	TableName : messageTable,
  	};

  	docClient.scan(paramsMessage, function(err, data) {
    	if (err) {
          	res.status(500).json({error: err}); 
    	} else {
        	console.log("Query succeeded.");
        	if(data.Items.length > 0) {
        		data.Items.forEach(function(item) {
            		console.log(" -", item);

            		if (friendsAndUser.indexOf(item.userid) != -1) {
            			messages.push(item);
            		}

            		if (messages.length > 0) {
            			res.status(201).json({message: "Messages", messages: messages});
            		} else {
            			res.status(500).json({error: 'No messages'}); 
            		}
        		});
        	} else {
            	res.status(500).json({error: 'No messages available'}); 
        	}
    	}
	});
};

exports.create_message = (req, res, next) => {
	params = {
    	TableName: messageTable,
    	Item:{
        	"msgid": req.body.userid + req.body.datetime,
        	"userid": req.body.userid,
        	"datetime": req.body.datetime,
        	"img": req.body.img,
        	"img_original": req.body.img,
        	"text":req.body.text 
    	}
	};

	console.log("Adding a new message...");
 	docClient.put(params, function(err, data) {
    	if (err) {
    		console.log('rui4');
        	res.status(500).json({error: err});
    	} else {
        	res.status(201).json({message: "Message created"});
    	}
	});
};