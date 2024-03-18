"use strict";

var _mysql = _interopRequireDefault(require("mysql2"));

var _config = _interopRequireDefault(require("./../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var parameters = {
  host: _config["default"].host,
  database: _config["default"].database,
  user: _config["default"].user,
  password: _config["default"].password,
  port: _config["default"].port,
  connectionLimit: 10,
  multipleStatements: true
};
console.log("🚀 ~ file: databaseMysql2.js:12 ~ parameters:", parameters);

var connection = _mysql["default"].createPool(parameters);

var getConnectionMysql2 = function getConnectionMysql2() {
  return connection;
};

module.exports = {
  getConnectionMysql2: getConnectionMysql2
};