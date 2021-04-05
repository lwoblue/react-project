const express = require('express');
const router = express.Router();
const multer = require("multer");
const uuidv4 = require('uuid/v4');
// const fs = require("fs");

var con = require("./../database/db_mysql");

const DIR = './src/public/images/slide-img';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName);
  },
  orgFilename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null,fileName);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
});

router.get(`/`, (req, res) =>
  res.status(200).send("upload for Mysql is running!")
);

router.post(`/upload-images`, upload.array('imgCollection', 6), (req, res, next) => {
    // const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        let fileData = {};
        fileData = {
            filename: req.files[i].filename,
            orgFilename: req.files[i].orgFilename,
            filePath: url + '/public/images/slide-img/',
        }
        console.log(next);
        console.log(fileData);
        // reqFiles.push(url + '/public/images/slide-img/' + req.files[i].filename);
        // reqFiles.push(url + '/public/images/slide-img/' + req.files[i].orgFilename);
    }

    con.connect(function (err) {
        if (err) throw err;

        console.log("Connected!");
        // get user primarykey id
        // update data (photoURL userName)
        con.query(`select sysdate() as conn_date from dual`,function(err, result_idx){
          if (err) throw err;
          console.log("1 record selected");
          // if user DB exist
          if(result_idx.length === 1){
            console.log(result_idx);
          }
        });
    });
})
module.exports = router;