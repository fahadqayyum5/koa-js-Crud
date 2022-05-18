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
