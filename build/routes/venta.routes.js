"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _venta = require("./../controllers/venta.controller");

var router = (0, _express.Router)();
router.post("/", _venta.methods.addVenta);
router.get("/Historial", _venta.methods.getHistorial30Dias);
router.get("/Estadisticas/:FechaInicio/:FechaFin", _venta.methods.getEstadisticas);
router.get("/:_id", _venta.methods.getVenta);
router["delete"]("/:_id", _venta.methods.deleteVenta);
var _default = router;
exports["default"] = _default;