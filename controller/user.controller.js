const db = require('../database/index')
const User = db.users

exports.create = (req, res) => {
    // Save to MySQL database
  User.create({
    name: req.body.name,
    email: req.body.email,
  }).then((user) => {
    res.status(200).json({
      status: true,
      message: "Book created successfully",
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