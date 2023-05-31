const axios = require("axios");

exports.homeRouter = (req, res) => {
  axios
    .get("http://localhost:5000/api/users")
    .then((response) => {
      console.log(response);
      res.render("index", { user: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user.ejs");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:5000/api/users", { params: { id: req.query.id } })
    .then((rs) => {
      res.render("update_user", { user: rs.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
