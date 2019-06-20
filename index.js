const Koa = require('koa');
const respond = require('koa-respond');
const Router = require('koa-router');
const mongoose = require('mongoose');
const routes = require("./src/routes/routes");
const {passport} = require("./src/models/userSchema");
const app = new Koa();
const router = new Router();
const PORT = 3000;

mongoose.Promise = Promise; // Ask Mongoose to use standard Promises
mongoose.set('debug', true);  // Ask Mongoose to log DB request to console
mongoose.connect('mongodb://localhost/test'); // Connect to local database
mongoose.connection.on('error', console.error);

app.use(passport.initialize());
app.use(passport.session());

routes({router});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = {server};
