require('dotenv').config()
const db = require('../database/index')
const User = db.user
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
    // Save to MySQL database
    console.log(req.body);
  // Validate request
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  user.password = await bycrypt.hash(req.body.password, 10)

  // Save Tutorial in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the username"
      });
    });

}


exports.login = async (req, res) => {
    // Validate request
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
      return  res.status(401).json({ err: "email not match" });
    }
    const user = await User.findOne({ email: req.body.email });
    // Validate user input
     if (!user) {
        return res.status(401).json({ err: "email not match" });
     }
    auth = await bycrypt.compare(req.body.password,user.password);
    if (!auth) {
            return res.status(401).json({ err: "password not match" });
          }

          const payload = {
            userId: user.id,
  };
    const token = jwt.sign(
    { payload },
            process.env.SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
    // save user token
  user.token = token; 
  await user.save().then((users) => {
    // Send all books as response
    res.status(200).json({
      status: true,
      data: users,
    });
  });

}


exports.getuser = (req, res) => {
    User.findAll().then((users) => {
      // Send all books as response
      res.status(200).json({
        status: true,
        data: users,
      });
    });
  };


  exports.update = (req, res) => {
    const id = req.params.userId;
    User.update(
      {
        name: req.body.name,
        email: req.body.email,
      },
      { where: { id: req.params.userId } }
    ).then(() => {
      res.status(200).json({
          status: true,
          message: "Book updated successfully with id = " + id
      });
    });
  };
  
  // Delete a book by Id
  exports.delete = (req, res) => {
    const id = req.params.userId;
    User.destroy({
      where: { id: id },
    }).then(() => {
      res.status(200).json({
          status: true,
          message: "Book deleted successfully with id = " + id
      });
    });
  };