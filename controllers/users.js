const User = require("../models/User");

//Create User
const createUser = async (ctx, next) => {
  console.log("Create User Called");
  const user = await User.findOne({ name: ctx.request.body.name });
  if (user) {
    ctx.throw(400, "This User Already Exists");
    // console.log("Error");
    // ctx.status = 400;
    // ctx.body = { success: false, error: "This User Already Exists" };
    return;
  }

  await User.create(ctx.request.body);
  ctx.status = 201;
  ctx.body = { success: true, message: "User Created Successfully" };
};

//Get All Users
const getUsers = async (ctx, next) => {
  ctx.throw(400, "Error Message");
  const users = await User.find();
  if (users.length < 0) {
    ctx.status = 404;
    ctx.body = { success: false, error: "Users Not Found" };
    return;
  }

  ctx.status = 200;
  ctx.body = { success: true, users: users };
};

//Get Single User
const getUser = async (ctx, next) => {
  const userId = ctx.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, error: "User Not Found" };
    return;
  }
  ctx.status = 200;
  ctx.body = { success: true, user: user };
};

//Update User
const updateUser = async (ctx, next) => {
  const userId = ctx.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, error: "User Not Found" };
    return;
  }
  //extract body
  const { name, age, address } = ctx.request.body;
  user.name = name;
  user.age = age;
  user.address = address;

  await user.save();

  ctx.status = 200;
  ctx.body = { success: true, updatedUser: user };
};

//Delete User
const deleteUser = async (ctx, next) => {
  const userId = ctx.params.id;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, error: "User Not Found" };
    return;
  }

  const deleteUser = await User.deleteOne({ _id: userId });
  ctx.status = 200;
  ctx.body = { success: true, deletedUser: deleteUser };
};

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;

module.exports.getUser = getUser;

module.exports.updateUser = updateUser;

module.exports.deleteUser = deleteUser;
