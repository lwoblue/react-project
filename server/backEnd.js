"use strict";

// import necessary modules
const express = require("express");

const socialLogin = require("./socialLogin/socialLogin");

// create an express app and use json body parser
const app = express();

// app.use(cors());
app.use(socialLogin);

// Start the server
const server = app.listen(process.env.PORT || "8090", () => {
  console.log(
    server.address().port
  );
});
