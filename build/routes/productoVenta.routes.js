"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _productoVenta = require("./../controllers/productoVenta.controller");

var router = (0, _express.Router)();
router.post("/", _productoVenta.methods.addProductoVenta);
var _default = router;
exports["default"] = _default;