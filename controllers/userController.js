const User = require("../models/user");


// CREATE

exports.user_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: user create GET");
  };

  exports.user_create_post = (req, res, next) => {

	const user = new User ({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	}).save(err => {
		if(err) {
			return next(err)
		}
	res.redirect("/")
	});
  };

// READ

exports.user_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: user detail: ${req.params.id}`);
  };
  

exports.user_list = (req, res) => {
    res.send("NOT IMPLEMENTED: user list");
  };

// UPDATE

exports.user_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: user update GET");
  };
  
  exports.user_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: user update POST");
  };

// DELETE

exports.user_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: user delete GET");
};


exports.user_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: user delete POST");
};

