const loginRouter = require("./login");
const productsRouter = require("./products");
const express = require("express")

function routerApi(app) {
    const router = express.Router();
    app.use("/api", router);
    router.use("/login", loginRouter);
    router.use("/products", productsRouter)
}

module.exports = routerApi;