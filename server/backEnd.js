// import necessary modules
const express = require("express");

const socialLogin = require("./socialLogin/socialLogin");
const imageUploadApp = require("./uploadRoutes/imageUploadRout");

// create an express app and use json body parser
const app = express();

// app.use(cors());
// app.use(cors());
app.use('/users',socialLogin);
app.use("/api", imageUploadApp);

// Start the server
const port = process.env.PORT || 8090;
// const server = app.listen(port, () => {
app.listen(port, () => {
  console.log('Connected to port ' + port);
});

app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
      next(new Error('Something went wrong'));
  });
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});