//const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const config = require('../../config/DB');
const AWS = require("aws-sdk");

AWS.config.update({accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: "eu-west-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

const messageTable = "message";

exports.get_messages = (req, res, next) => {

	if (!req.userData) {
    	res.status(500).json({error: 'err1'});
    	return;
	} else {
		console.log(req.userData);
	}


	/*var params = {
      	TableName : messageTable,
      	KeyConditionExpression: "userid = :username",
      	ExpressionAttributeValues: {
         	":username":req.userData
      	}
  	};*/
};
