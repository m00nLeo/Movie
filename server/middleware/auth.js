const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Genre = require("../models/genre");

const DATA_PATH = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

const genre = Genre.all();

const users = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

const auth = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!req.headers.authorization) token = "";

  if (!token) {
    res.status(404).json({ message: "Unauthorized" }); // Trả về lỗi 404 nếu không có token
  } else {
    const user = users.find((u) => u.token === token);

    if (!user) {
      res.status(404).json({ genre, message: "Unauthorized user" });
    } else {
      req.user = user; // Lưu thông tin user vào request
      next(); // Tiếp tục xử lý nếu token hợp lệ
    }
  }
};

module.exports = auth;
