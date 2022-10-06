"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _producto = require("./../controllers/producto.controller");

var router = (0, _express.Router)();
router.get("/", _producto.methods.getProductos);
var _default = router;
exports["default"] = _default;