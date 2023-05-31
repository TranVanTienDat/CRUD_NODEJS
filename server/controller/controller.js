const userDB = require("../model/model");
const uerDB = require("../model/model");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "not found" });
    return;
  }

  const user = new uerDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  user
    .save()
    .then((data) => {
      // res.status(200).json(data);
      res.redirect("/add-user");
    })
    .catch(() => {
      res.status(500).send({ message: "error" });
    });
};

exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    userDB
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
    userDB
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
      });
  }
};

// Update a new idetified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "error" });
  }
  const id = req.params.id;
  userDB
    .findByIdAndUpdate(id, req.body, { useFinAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `update  isn't  ${id} success` });
      } else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "error update" });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  userDB
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
