"use strict";

var _promiseMysql = _interopRequireDefault(require("promise-mysql"));

var _config = _interopRequireDefault(require("./../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var parameters = {
  host: _config["default"].host,
  database: _config["default"].database,
  user: _config["default"].user,
  password: _config["default"].password,
  port: _config["default"].port,
  connectTimeout: 100000
};
console.log("🚀 ~ file: database.js ~ line 11 ~ parameters", parameters);

var connection = _promiseMysql["default"].createPool(parameters);

var getConnection = function getConnection() {
  return connection;
};

module.exports = {
  getConnection: getConnection
};