const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(req);
    console.log(file);
    cb(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 1000000000) +
        "." +
        file.mimetype.split("/")[1]
    );
  }
});

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype !== "image/jpg") {
//         cb(new Error ("hey not image file "))
//     }
// };

module.exports = multer({ storage });
