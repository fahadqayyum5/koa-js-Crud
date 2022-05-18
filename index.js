const Koa = require("koa");

require("dotenv").config();

const cors = require("@koa/cors");

const bodyParser = require("koa-bodyparser");

const logger = require("koa-logger");

//Connect To The Database
require("./config/connectDatabase")();

const userRoutes = require("./routes/users");

const colors = require("colors");

const server = new Koa();

//Error handling Middleware
server.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    err.expose = true;

    ctx.app.emit("error", err, ctx);
  }
});

server.on("error", (err, ctx) => {
  ctx.body = { success: false, error: err.message, statusCode: err.status };
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
   */
});

//Body Parser
server.use(bodyParser());

//Koa Cors
server.use(cors());

//Request Logger
server.use(logger());

server.use(userRoutes.routes());

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server Listening On Port ${port}`.black.bgBlue);
});
