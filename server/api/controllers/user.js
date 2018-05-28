//const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const config = require('../../config/DB');
const AWS = require("aws-sdk");

AWS.config.update({accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: "eu-west-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

//const User = require("../models/user");
const userTable = "user";

exports.user_signup = (req, res, next) => {
  	if(!req.body.username || !req.body.password || !req.body.name){
    	return res.status(409).json({
        	message: "Required fields missing"
      	});
  	}

  	const cipher = crypto.createCipher('aes192', req.body.password);
	let encrypted = '';
	cipher.on('readable', () => {
  		const data = cipher.read();
  		if (data) encrypted += data.toString('hex');
	});

	cipher.write('superproject');
	cipher.end();

	var params = {
    	TableName : userTable,
    	KeyConditionExpression: "userid = :username",
    	ExpressionAttributeValues: {
        	":username":req.body.username
    	}	
	};

	docClient.query(params, function(err, data) {
    	if (err) {
    		//console.log('rui2');
        	res.status(500).json({error: err});
    	} else {
        	console.log("Query succeeded.");
        	if(data.Items.length > 0){
         		console.log(err);
                res.status(500).json({error: err});
       		}
    	}
	});

 	params = {
    	TableName: userTable,
    	Item:{
        	"userid":req.body.username,
        	"username": req.body.username,
        	"password": encrypted,
        	"name":req.body.name,
        	"img_photo":"https://s3-eu-west-1.amazonaws.com/iplproject/nophoto.jpg" //nophoto
    	}
	};

	console.log("Adding a new user...");
 	docClient.put(params, function(err, data) {
    	if (err) {
        	res.status(500).json({error: err});
    	} else {
        	res.status(201).json({message: "User created"});
    	}
	});
};

exports.user_login = (req, res, next) => {
	const cipher = crypto.createCipher('aes192', req.body.password);
	let encrypted = '';
	cipher.on('readable', () => {
  		const data = cipher.read();
  		if (data) encrypted += data.toString('hex');
	});

	cipher.write('superproject');
	cipher.end();

	if(!req.body.username || !req.body.password){
    	context.fail(JSON.stringify({status:'fail', reason:'Password or Username Inválid', foo:'bar'})); 
    	return;
	}

	var params = {
    	TableName : userTable,
    	KeyConditionExpression: "userid = :username",
    	ExpressionAttributeValues: {
        	":username":req.body.username
    	}
	};

	docClient.query(params, function(err, data) {
    	if (err) {
        	console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    	} else {
        	console.log("Query succeeded.");
        	if(data.Items.length > 0) {
        		data.Items.forEach(function(item) {
            		console.log(" -", item.name + ": " + item.username);
            	
            		if(item.password == encrypted) {
                		callback(null, "Login OK");    
            		} else {
                		context.fail(JSON.stringify({status:'fail', reason:'Password or Username Inválid', foo:'bar'})); 
            		}
        		});
        	} else {
            	context.fail(JSON.stringify({status:'fail', reason:'User not exists!', foo:'bar'})) 
        	}
    	}
	});
};

exports.user_delete = (req, res, next) => {
};



  /*User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};*/

/*exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};*/

/*exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};*/
