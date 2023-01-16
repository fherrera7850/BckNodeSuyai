"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _cliente = require("./../controllers/cliente.controller");

var router = (0, _express.Router)();
router.post("/", _cliente.methods.addCliente);
router.get("/", _cliente.methods.getClientes);
router.get("/:_id", _cliente.methods.getCliente);
var _default = router;
exports["default"] = _default;