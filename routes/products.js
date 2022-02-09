var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken')
const ProductService = require("./../services/product-service")
const service = new ProductService()

router.get("/", verifyToken, (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (error, authData) => {
    try {
      if(error) {
        throw new Error("Bad credentials");
      }
      const products = await service.getAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
});

router.get("/:id", verifyToken, (req, res, next) => {
  const id = req.params.id;
  jwt.verify(req.token, "secretkey", async (error, authData) => {
    try {
      if(error) {
        throw new Error("Bad credentials");
      }
      const product = await service.getById(id)
      res.status(200).json(product)
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
});

router.post("/", verifyToken, (req, res, next) => {
  const body = req.body;
  jwt.verify(req.token, "secretkey", async (error, authData) => {
    try {
      if(error) {
        throw new Error("Bad credentials");
      }
      const product = await service.create(body);
      res.status(201).json(product);
    } catch (error) {
      res.status(401).send(error.message);
    }
  })
});

router.put("/update/:id", verifyToken, (req, res, next) => {
  const body = req.body;
  const id = req.params.id
  jwt.verify(req.token, "secretkey", async (error, authData) => {
    try {
      if(error) {
        throw new Error("Bad credentials");
      }
      const product = await service.update(id, body);
      res.status(202).json(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
});

router.delete("/delete/:id", verifyToken, (req, res, next) =>{
  const id = req.params.id
  jwt.verify(req.token, "secretkey", async (error, authData) => {
    try {
      if(error) {
        throw new Error("Bad credentials");
      }
      const deleted = await service.delete(id);
      res.status(202).json(deleted)
    } catch (error) {
      res.status(404).send(error.message)
    }
  })
})

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
