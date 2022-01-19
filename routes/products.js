var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken')

router.get("/", verifyToken, function (req, res, next) {
  jwt.verify(req.token, "secretkey", (error, authData) => {
    if(error) {
      res.send(error.message);
    } else {
      res.send("Method GET working")
    }
  })
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    req.token = bearerHeader.split(" ")[1];
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
