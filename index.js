var express = require('express');
var app = express();

var bodyParser = require('body-parser');
_ = require ('underscore');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

var users = [
	{
	id: 1,
	username: "DLo",
	firstname: "Diane",
	lastname: "Lo",
	age: 26
	},
	{
	id: 2 ,
	username: "EBacker",
	firstname: "Eva",
	lastname: "Backer",
	age: 34
	},
	{
	id: 3 ,
	username: "LLo",
	firstname: "Linda",
	lastname: "Lo",
	age: 50
	}
];

app.get("/users",function(req,res){
	res.json(users);
})

app.post("/users", function(req,res){
	var newUser = req.body;
	users.push(newUser);
	res.json(newUser);
});

app.put('/users/:id', function(req,res){

	console.log ("these are the req.params");
	console.log (req.params);

	console.log("these are the req.body");
	console.log(req.body);

	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId})
	foundUser.username = req.body.username || foundUser.username;
	foundUser.firstname = req.body.firstname || foundUser.firstname;
	foundUser.lastname = req.body.lastname || foundUser.lastname;
	foundUser.age = req.body.age || foundUser.age;
	res.json(foundUser);
});

app.delete('/users/:id', function(req,res){
	var targetId = parseInt(req.params.id);
	var foundUser = _.findWhere(users, {id: targetId})
	console.log(foundUser);
	
	if (foundUser) {
		var index = users.indexOf(foundUser);
		console.log(index);
		users.splice(index,1);
		res.json(foundUser);
	}
	else 
	{
		res.json(users);
	};

})


app.listen(3000);