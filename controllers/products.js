//Create Product
const Product = require("../models/Product");
const createProduct = async (ctx, next) => {
  const product = await Product.findOne({ name: ctx.request.body.name });
  if (product) {
    return ctx.throw(400, "Product Already Exists");
  }
  await Product.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = { success: true, message: "Product Created Successfully" };
};

//Get Specific User Product
const getUserProducts = async (ctx, next) => {
  const userId = ctx.params.id;
  const products = await Product.find({ owner: userId });
  if (products.length < 1) {
    return ctx.throw(404, `User ${userId} does not have any products`);
  }

  ctx.status = 200;
  ctx.body = { success: true, products: products };
};

module.exports.createProduct = createProduct;
module.exports.getUserProducts = getUserProducts;
