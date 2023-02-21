"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _pedidoVenta = require("../controllers/pedidoVenta.controller");

var router = (0, _express.Router)();
router.post("/CompletaPedidoVenta", _pedidoVenta.methods.CompletaPedidoVenta);
var _default = router;
exports["default"] = _default;