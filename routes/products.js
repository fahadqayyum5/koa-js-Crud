const { createProduct, getUserProducts } = require("../controllers/products");

const Router = require("koa-router");

const route = new Router();

//Add New Product
route.post("/products", createProduct);

// //Get All User Products
route.get("/products/:id", getUserProducts);

// //Get Single User
// route.get("/users/:id", getUser);

// //Update User
// route.put("/users/:id", updateUser);

// //Delete  User
// route.delete("/users/:id", deleteUser);

module.exports = route;
