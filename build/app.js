"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _language = _interopRequireDefault(require("./routes/language.routes"));

var _producto = _interopRequireDefault(require("./routes/producto.routes"));

var _venta = _interopRequireDefault(require("./routes/venta.routes"));

var _productoVenta = _interopRequireDefault(require("./routes/productoVenta.routes"));

var _cliente = _interopRequireDefault(require("./routes/cliente.routes"));

var _pedidoVenta = _interopRequireDefault(require("./routes/pedidoVenta.routes"));

var _pedido = _interopRequireDefault(require("./routes/pedido.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Routes
var app = (0, _express["default"])(); // Settings

app.set("port", process.env.PORT || 4000); // Middlewares

app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json({
  limit: "50mb",
  extended: true
}));
app.use(_express["default"].urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
})); // Routes

app.use("/api/languages", _language["default"]);
app.use("/api/producto", _producto["default"]);
app.use("/api/venta", _venta["default"]);
app.use("/api/productoventa", _productoVenta["default"]);
app.use("/api/cliente", _cliente["default"]);
app.use("/api/pedidoventa", _pedidoVenta["default"]);
app.use("/api/pedido", _pedido["default"]);
var _default = app;
exports["default"] = _default;