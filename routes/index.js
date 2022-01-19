const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res, next) => {
  const user = req.body;
  jwt.sign(
    { user },
    "secretkey",
    (err, token) => {
      res.json({
        token,
      });
    }
  );
});

module.exports = router;
