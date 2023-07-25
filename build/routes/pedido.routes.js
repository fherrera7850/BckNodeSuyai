"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _pedido = require("../controllers/pedido.controller");

var router = (0, _express.Router)();
router.get("/", _pedido.methods.getPedidos);
router.get("/:_id", _pedido.methods.getPedido);
router.post("/CompletarPedido", _pedido.methods.CompletarPedido);
router.post("/CompletarPedido2", _pedido.methods.CompletarPedido2);
router.post("/CompletarPedidoRapido", _pedido.methods.CompletarPedidoRapido);
var _default = router;
exports["default"] = _default;