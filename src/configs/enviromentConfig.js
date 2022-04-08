let port;
let db;
let session_time;
let adminMail;

const enviroment = process.env.NODE_ENV;
switch (enviroment) {
  case "development":
    port = 8080;
    db = "mongodb+srv://Leandro:123@clusterdemo.eullt.mongodb.net/test";
    session_time = 600000;
    adminMail = "leandromena_94@hotmail.com";
    break;
  case "test":
    port = 8080;
    db = "mongodb+srv://Leandro:123@clusterdemo.eullt.mongodb.net/test";
    session_time = 600000;
    adminMail = "leandromena_94@hotmail.com";
    break;
  case "production":
    port = 3000;
    db = `mongodb+srv://Leandro:123@clusterdemo.eullt.mongodb.net/test`;
    session_time = 60000;
    adminMail = "leandromena_94@hotmail.com";
    break;
  default:
    port = 8080;
    db = "mongodb+srv://Leandro:123@clusterdemo.eullt.mongodb.net/test";
    session_time = 60000;
    adminMail = "leandromena_94@hotmail.com";
    break;
}

exports.port = port;
exports.dbString = db;
exports.session_time = session_time;
exports.adminMail = adminMail;
