const express = require('express');
const router = express.Router();
const multer = require("multer");
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');

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

const deleteFolderRecursive = (path) => {
  let count = 0;
  // existsSync: 파일이나 폴더가 존재하는 파악
  if (fs.existsSync(path)) {               
     // readdirSync(path): 디렉토리 안의 파일의 이름을 배열로 반환
    fs.readdirSync(path).forEach((file, index)=>{  
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) { // lstatSync: stat값을 반환함, isDirectory(): 디렉토리인지 파악
        //deleteFolderRecursive(curPath);          // 재귀(reCurse)
      } else {                                              // delete file
        fs.unlinkSync(curPath);                     // unlinkSync: 파일 삭제
      }
      count++;
    });
    //fs.rmdirSync(path);                              // rmdirSync: 폴더 삭제
  }else{
    fs.mkdirSync(path);
  }
  return count;
};

const upload = multer({
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


router.post(`/read-images`, (req, res) => {
  const fileArray = [];
  // existsSync: 파일이나 폴더가 존재하는 파악
  if (fs.existsSync(DIR)) {               
     // readdirSync(path): 디렉토리 안의 파일의 이름을 배열로 반환
    fs.readdirSync(DIR).forEach((file, index)=>{  
      fileArray.push({fileName: file});
    });
    //fs.rmdirSync(path);                              // rmdirSync: 폴더 삭제
  }
  res.status(200).send({data: fileArray});
});


router.post(`/clear-images`, (req, res) => {
  const cnt = deleteFolderRecursive(DIR);
  if(cnt > 0){
    let sql = "DELETE FROM SLIDE ; ";
    console.log("Delete!");
    // get user primarykey id
    // update data (photoURL userName)
    con.query(sql, function(err, result_idx){
      if (err) throw err;
      // if user DB exist
      console.log("Number of records Deleted: " + result_idx.affectedRows);
    });
  }
  res.status(200).send("delete");
  console.log(`clear-images`);
});

router.post(`/upload-images`, upload.array('img-files'), (req, res, next) => {

     // const reqFiles = [];
    const fileArray = [];
    console.log(`router`);
    for (var i = 0; i < req.files.length; i++) {
        let fileData = [];
        fileData = [
            req.files[i].filename,
            req.files[i].originalname,
            path.extname(req.files[i].originalname),
            req.files[i].destination,
            req.files[i].size,
            req.files[i].mimetype
        ];
        fileArray.push(fileData);
    }
     
    con.connect(function (err) {
     if (err) throw err;
     let sql = "INSERT INTO SLIDE (";
         sql += "FILE_NAME, FILE_ORG_NAME, FILE_TYPE, FILE_PATH, FILE_SIZE, FILE_MIME_TYPE";
         sql += ") VALUES ? ";
         sql += " ;";
      // get user primarykey id
      // update data (photoURL userName)
      con.query(sql,[fileArray], function(err, result_idx){
      if (err) throw err;
      // if user DB exist
      console.log("Number of records inserted: " + result_idx.affectedRows);

      const resArray = [];
      // existsSync: 파일이나 폴더가 존재하는 파악
      if (fs.existsSync(DIR)) {               
        // readdirSync(path): 디렉토리 안의 파일의 이름을 배열로 반환
        fs.readdirSync(DIR).forEach((file, index)=>{  
          resArray.push({fileName: file});
        });
      }
      res.status(200).send({data: resArray});
     });
   });
   
})
module.exports = router;