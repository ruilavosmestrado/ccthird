//const mongoose = require("mongoose");
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const config = require('../../config/DB');
const AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4');

AWS.config.update({accessKeyId: config.ACCESS_KEY, secretAccessKey: config.SECRET_KEY, region: "eu-west-1"});

var docClient = new AWS.DynamoDB.DocumentClient();

//const User = require("../models/user");
const userTable = "user";
const friendTable = "friendships";

exports.user_signup = (req, res, next) => {

    var username = req.body.username;

    if (req.body.gen) {
        username = uuidv4();
    } else if (!req.body.username) {
        return res.status(409).json({
            message: "Required fields missing"
        });
    } else {
        username = req.body.username;
    }

  	if(!req.body.password || !req.body.name){
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
    		return res.status(500).json({error: err});
    	} else {
        	console.log("Query succeeded.");
        	if(data.Items.length > 0){
         		console.log(err);
                return res.status(500).json({error: err});
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
        	return res.status(500).json({error: err});
    	} else {
        	return res.status(201).json({message: "User created"});
    	}
	});
};

exports.user_login = (req, res, next) => {
  console.log('rui login');
	const cipher = crypto.createCipher('aes192', req.body.password);
	let encrypted = '';
	cipher.on('readable', () => {
  		const data = cipher.read();
  		if (data) encrypted += data.toString('hex');
	});

	cipher.write('superproject');
	cipher.end();

	if(!req.body.username || !req.body.password){
    	res.status(500).json({error: 'err1'});
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
          	res.status(500).json({error: err}); 
    	} else {
        	console.log("Query succeeded.");
        	if(data.Items.length > 0) {
        		data.Items.forEach(function(item) {
            		console.log(" -", item.name + ": " + item.username);
            	
            		if(item.password == encrypted) {
            			const token = jwt.sign(
  						{
              				username: item.username,
            			},
            			process.env.JWT_KEY,
           				{
              				expiresIn: "1h"
           	 			});
                		return res.status(201).json({message: "Login OK", token: token, user: item.username});    
            		} else {
                		res.status(500).json({error: 'Wrong Password or Username'}); 
            		}
        		});
        	} else {
            	res.status(500).json({error: 'No user found'}); 
            	
        	}
    	}
	});
};

exports.user_delete = (req, res, next) => {
};

exports.get_all_users = (req, res, next) => {
  var params = {
      TableName : userTable,
  };

  docClient.scan(params, function(err, data) {
      if (err) {
        res.status(500).json({error: err});
      } else {
          console.log("Query succeeded.");
          if(data.Items.length <= 0){
            console.log(err);
            res.status(500).json({error: err});
          }
          res.status(201).json({data: data.Items});
      }
  });
};

exports.search_user = (req, res, next) => {
  console.log('user ' + req.body.username);

  var params = {
      TableName : userTable,
      KeyConditionExpression: "userid = :username",
      ExpressionAttributeValues: {
          ":username":req.body.username
      }
  };

  docClient.query(params, function(err, data) {
      if (err) {
        res.status(500).json({error: err});
      } else {
          console.log("Query succeeded.");
          if(data.Items.length <= 0){
            console.log(err);
            res.status(500).json({error: err});
          }
          res.status(201).json({data: data.Items});
      }
  });
};

exports.my_friends = (req, res, next) => {
  console.log('user ' + req.body.username);

  var params = {
      TableName : friendTable,
      FilterExpression: "userid1 = :username",
      ExpressionAttributeValues: {
          ":username":req.body.username
      }
  };

  docClient.scan(params, function(err, data) {
      if (err) {
        res.status(500).json({error: err});
      } else {
          console.log("Query succeeded.");
          if(data.Items.length <= 0){
            console.log(err);
            res.status(500).json({error: err});
          }

          data.Items.forEach(function(item) {
            var params = {
              TableName : userTable,
              KeyConditionExpression: "userid = :username2",
              ExpressionAttributeValues: {
                ":username2":item.userid2
              }
            };

          docClient.query(params, function(err, userData) {
            if (err) {
              res.status(500).json({error: err});
            } else {
              console.log("Query succeeded.");
              if(userData.Items.length <= 0){
                console.log(err);
                res.status(500).json({error: err});
              }

              item["img_photo"] = userData.Items.img_photo,
              item["name"] = userData.Items.name,
              item["username"] = userData.Items.username
            }
          });
          });

          console.log(data.Items);
          res.status(201).json({data: data.Items});
      }
  })
};


exports.friend_requests = (req, res, next) => {
  console.log('user ' + req.body.username);

  var params = {
      TableName : friendTable,
      FilterExpression: "userid2 = :username",
      ExpressionAttributeValues: {
          ":username":req.body.username
      }
  };

  docClient.scan(params, function(err, data) {
      if (err) {
        res.status(500).json({error: err});
      } else {
          console.log("Query succeeded.");
          if(data.Items.length <= 0){
            console.log(err);
            res.status(500).json({error: err});
          }

          data.Items.forEach(function(item) {
            var params = {
              TableName : userTable,
              KeyConditionExpression: "userid = :username3",
              ExpressionAttributeValues: {
                ":username3":item.userid2
              }
            };

          docClient.query(params, function(err, userData) {
            if (err) {
              res.status(500).json({error: err});
            } else {
              console.log("Query succeeded.");
              if(userData.Items.length <= 0){
                console.log(err);
                res.status(500).json({error: err});
              }

              item["img_photo"] = userData.Items.img_photo,
              item["name"] = userData.Items.name,
              item["username"] = userData.Items.username
            }
          });
          });

          console.log(data.Items);
          res.status(201).json({data: data.Items});
      }
  })
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
