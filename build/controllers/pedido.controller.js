"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;

var _database = require("../database/database");

var _databaseMysql = require("../database/databaseMysql2");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getPedidos = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var connection, qryFechas, resultFechas, qryAgrupados, resultAgrupados, qryDetalleProductos, resultDetalleProductos;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _database.getConnection)();

          case 3:
            connection = _context.sent;
            qryFechas = 'SELECT DISTINCT FechaEntrega FROM pedido order by 1';
            _context.next = 7;
            return connection.query(qryFechas);

          case 7:
            resultFechas = _context.sent;

            if (!(resultFechas.length > 0)) {
              _context.next = 31;
              break;
            }

            resultFechas.forEach(function (element) {
              return element.Pedidos = [];
            });
            qryAgrupados = 'SELECT ped._id Pedido_id, c._id Cliente_id, v._id Venta_id, c.Nombre, ped.Direccion, ped.Telefono, ped.FechaEntrega, ped.Estado, ped.Nota, v.PrecioTotalVenta ';
            qryAgrupados += 'FROM pedido ped ';
            qryAgrupados += 'LEFT JOIN venta v on v._id=ped.Venta_id ';
            qryAgrupados += 'LEFT JOIN cliente c on c._id=v.Cliente_id ORDER BY 1;';
            _context.next = 16;
            return connection.query(qryAgrupados);

          case 16:
            resultAgrupados = _context.sent;

            if (!(resultAgrupados.length > 0)) {
              _context.next = 29;
              break;
            }

            //Agrega array vacio para el detalle del pedido
            resultAgrupados.forEach(function (element) {
              return element.Pedido = [];
            });
            qryDetalleProductos = 'SELECT ped._id as Pedido_id, pv.Cantidad, p.Nombre as Producto, p._id Producto_id, pv.PrecioVentaProducto PrecioVenta ';
            qryDetalleProductos += 'FROM venta v ';
            qryDetalleProductos += 'RIGHT JOIN pedido ped on ped.Venta_id=v._id ';
            qryDetalleProductos += 'INNER JOIN productoventa pv on v._id=pv.Venta_id ';
            qryDetalleProductos += 'INNER JOIN producto p on p._id=pv.Producto_id ORDER BY 1;';
            _context.next = 26;
            return connection.query(qryDetalleProductos);

          case 26:
            resultDetalleProductos = _context.sent;
            resultFechas.forEach(function (grandparent) {
              grandparent.FechaEntrega = (0, _moment["default"])(grandparent.FechaEntrega).format('YYYY-MM-DD');
              resultAgrupados.forEach(function (parent) {
                //console.log("grandparent.FechaEntrega", grandparent.FechaEntrega)
                //console.log("parent.FechaEntrega", parent.FechaEntrega)
                parent.FechaEntrega = (0, _moment["default"])(parent.FechaEntrega).format('YYYY-MM-DD');

                if (grandparent.FechaEntrega.toString() === parent.FechaEntrega.toString()) {
                  grandparent.Pedidos.push(parent);
                  resultDetalleProductos.forEach(function (child) {
                    if (parent.Pedido_id === child.Pedido_id) {
                      parent.Pedido.push(child);
                    }
                  });
                }
              });
            });
            res.json(resultFechas);

          case 29:
            _context.next = 32;
            break;

          case 31:
            res.json({
              ErrorMessage: "No hay pedidos para mostrar"
            });

          case 32:
            _context.next = 39;
            break;

          case 34:
            _context.prev = 34;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
            res.status(500);
            res.send(_context.t0.toString());

          case 39:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 34]]);
  }));

  return function getPedidos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getPedido = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var connection, _id, qryAgrupados, resultAgrupados, qryDetalleProductos, resultDetalleProductos;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _database.getConnection)();

          case 3:
            connection = _context2.sent;
            _id = req.params._id;
            qryAgrupados = 'SELECT ped._id Pedido_id, c._id Cliente_id, v._id Venta_id, c.Nombre, ped.Direccion, ped.Telefono, ped.FechaEntrega, ped.Estado, v.MedioPago, v.Observacion, v.Dcto ';
            qryAgrupados += 'FROM pedido ped ';
            qryAgrupados += 'LEFT JOIN venta v on v._id=ped.Venta_id ';
            qryAgrupados += 'LEFT JOIN cliente c on c._id=v.Cliente_id ';
            qryAgrupados += 'WHERE ped._id = ' + _id + ';';
            _context2.next = 12;
            return connection.query(qryAgrupados);

          case 12:
            resultAgrupados = _context2.sent;
            //Agrega array vacio para el detalle del pedido
            resultAgrupados.forEach(function (element) {
              return element.Productos = [];
            });
            qryDetalleProductos = 'SELECT ped._id as Pedido_id, pv.Cantidad, p._id Producto_id, p.Nombre, p.Precio, p.Costo ';
            qryDetalleProductos += 'FROM venta v ';
            qryDetalleProductos += 'RIGHT JOIN pedido ped on ped.Venta_id=v._id ';
            qryDetalleProductos += 'INNER JOIN productoventa pv on v._id=pv.Venta_id ';
            qryDetalleProductos += 'INNER JOIN producto p on p._id=pv.Producto_id ';
            qryDetalleProductos += 'WHERE ped._id = ' + _id + ';';
            _context2.next = 22;
            return connection.query(qryDetalleProductos);

          case 22:
            resultDetalleProductos = _context2.sent;
            resultAgrupados.forEach(function (parent) {
              resultDetalleProductos.forEach(function (child) {
                if (parent.Pedido_id === child.Pedido_id) {
                  parent.Productos.push(child);
                }
              });
            });
            console.log("🚀 ~ file: pedido.controller.js:97 ~ getPedido ~ resultAgrupados", resultAgrupados);
            res.json(resultAgrupados);
            _context2.next = 33;
            break;

          case 28:
            _context2.prev = 28;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            res.status(500);
            res.send(_context2.t0.toString());

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 28]]);
  }));

  return function getPedido(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deletePedido = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id_pedido, connection, callProcedureQuery;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id_pedido = req.body.id_pedido;
            console.log("🚀 id_pedido", id_pedido);
            _context4.next = 5;
            return (0, _database.getConnection)();

          case 5:
            connection = _context4.sent;
            // Llamamos al procedimiento almacenado con un valor para PedidoID
            callProcedureQuery = "CALL Del_Pedido(".concat(id_pedido, ", @Estado);"); // Ejecutamos la llamada al procedimiento

            connection.query(callProcedureQuery, /*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(err, results) {
                var selectEstadoQuery;
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!err) {
                          _context3.next = 5;
                          break;
                        }

                        console.error(err);
                        res.status(500);
                        res.send(err.toString());
                        return _context3.abrupt("return");

                      case 5:
                        // Luego, ejecutamos una consulta adicional para obtener el valor de @Estado
                        selectEstadoQuery = "SELECT @Estado AS Estado;"; // Ejecutamos la consulta para obtener el valor de @Estado

                        connection.query(selectEstadoQuery, function (err, results) {
                          if (err) {
                            console.error(err);
                            res.status(500);
                            res.send(err.toString());
                            return;
                          }

                          var estado = results[0].Estado;

                          if (estado === 0) {
                            // Ocurrió un error en el procedimiento almacenado
                            res.status(500);
                            res.send("Error: El procedimiento almacenado no pudo eliminar el registro.");
                          } else {
                            res.status(200); // Aquí puedes enviar una respuesta exitosa si lo deseas

                            res.send("Registro eliminado correctamente.");
                          }
                        });

                      case 7:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x7, _x8) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context4.next = 15;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            res.status(500);
            res.send(_context4.t0.toString());

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function deletePedido(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var CompletarPedido = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body, Venta, ProductosVenta, Pedido, fx, connection;

    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            //DEPRECADO, USAR 2
            _req$body = req.body, Venta = _req$body.Venta, ProductosVenta = _req$body.ProductosVenta, Pedido = _req$body.Pedido;
            console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Pedido:", Pedido);
            console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Venta:", Venta);
            fx = Venta.Fecha.toString();
            fx = fx.replace(/T/g, " ");
            fx = fx.replace(/Z/g, "");
            Venta.Fecha = fx;
            _context7.next = 9;
            return (0, _database.getConnection)();

          case 9:
            connection = _context7.sent;
            _context7.prev = 10;
            _context7.next = 13;
            return connection.query('START TRANSACTION', /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(err, rows) {
                var datosProductoVenta, eliminados, nuevos, mismos, keyDatosPV, key, PV, _keyDatosPV, estaEnMismos, _key, _PV, keyProductosVenta, _PV2, _estaEnMismos, keyMismos, k, _k, _k2, QryPedido, QryVenta;

                return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return connection.query("select * from productoventa where Venta_id = ".concat(Pedido.Venta_id));

                      case 2:
                        datosProductoVenta = _context6.sent;
                        eliminados = [];
                        nuevos = [];
                        mismos = []; //identifica los que setan en ambos

                        for (keyDatosPV in datosProductoVenta) {
                          for (key in ProductosVenta) {
                            PV = {
                              Producto_id: ProductosVenta[key]._id,
                              Cantidad: ProductosVenta[key].Cantidad,
                              PrecioVentaProducto: ProductosVenta[key].PrecioVenta > 0 ? ProductosVenta[key].PrecioVenta : ProductosVenta[key].Precio
                            };

                            if (PV.Producto_id === datosProductoVenta[keyDatosPV].Producto_id) {
                              //Se guardan en el array de los que ya están para hacer update
                              mismos.push(PV);
                            }
                          }
                        } //identifica eliminados


                        for (_keyDatosPV in datosProductoVenta) {
                          estaEnMismos = false;

                          for (_key in mismos) {
                            _PV = {
                              Producto_id: ProductosVenta[_key]._id
                            };

                            if (mismos[_key].Producto_id === datosProductoVenta[_keyDatosPV].Producto_id) {
                              estaEnMismos = true;
                            }
                          }

                          if (!estaEnMismos) {
                            eliminados.push(datosProductoVenta[_keyDatosPV]);
                          }
                        } //identifica nuevos


                        for (keyProductosVenta in ProductosVenta) {
                          _PV2 = {
                            Venta_id: Pedido.Venta_id,
                            Producto_id: ProductosVenta[keyProductosVenta]._id,
                            Cantidad: ProductosVenta[keyProductosVenta].Cantidad,
                            PrecioVentaProducto: ProductosVenta[keyProductosVenta].PrecioVenta > 0 ? ProductosVenta[keyProductosVenta].PrecioVenta : ProductosVenta[keyProductosVenta].Precio
                          };
                          _estaEnMismos = false;

                          for (keyMismos in mismos) {
                            if (mismos[keyMismos].Producto_id === _PV2.Producto_id) {
                              _estaEnMismos = true;
                            }
                          }

                          if (!_estaEnMismos) {
                            nuevos.push(_PV2);
                          }
                        }

                        console.log("--------------MISMOS----------");
                        console.log(mismos);
                        console.log("--------------ELIMINADOS----------");
                        console.log(eliminados);
                        console.log("--------------NUEVOS----------");
                        console.log(nuevos);
                        console.log("--------------VENTA----------");
                        console.log(Venta);
                        console.log("--------------PEDIDO----------");
                        console.log(Pedido);
                        _context6.t0 = _regeneratorRuntime().keys(mismos);

                      case 20:
                        if ((_context6.t1 = _context6.t0()).done) {
                          _context6.next = 26;
                          break;
                        }

                        k = _context6.t1.value;
                        _context6.next = 24;
                        return connection.query("UPDATE productoventa \n                    SET \n                    CANTIDAD = ".concat(mismos[k].Cantidad, ", \n                    PRECIOVENTAPRODUCTO = ").concat(mismos[k].PrecioVentaProducto, " \n                    WHERE \n                    VENTA_ID = ").concat(Pedido.Venta_id, " AND \n                    PRODUCTO_ID = ").concat(mismos[k].Producto_id, ";"));

                      case 24:
                        _context6.next = 20;
                        break;

                      case 26:
                        _context6.t2 = _regeneratorRuntime().keys(eliminados);

                      case 27:
                        if ((_context6.t3 = _context6.t2()).done) {
                          _context6.next = 33;
                          break;
                        }

                        _k = _context6.t3.value;
                        _context6.next = 31;
                        return connection.query("DELETE FROM productoventa \n                WHERE \n                _ID = ".concat(eliminados[_k]._id, ";"));

                      case 31:
                        _context6.next = 27;
                        break;

                      case 33:
                        _context6.t4 = _regeneratorRuntime().keys(nuevos);

                      case 34:
                        if ((_context6.t5 = _context6.t4()).done) {
                          _context6.next = 40;
                          break;
                        }

                        _k2 = _context6.t5.value;
                        _context6.next = 38;
                        return connection.query("INSERT INTO productoventa \n                    SET ?", nuevos[_k2]);

                      case 38:
                        _context6.next = 34;
                        break;

                      case 40:
                        /* nuevos.forEach(async (item) => {
                            await connection.query(
                                `INSERT INTO productoventa 
                                SET ?`, item)
                        }) */
                        QryPedido = "UPDATE pedido ";
                        QryPedido += "SET ";
                        QryPedido += Pedido.Direccion ? "DIRECCION = '".concat(Pedido.Direccion, "' , ") : "DIRECCION = null, ";
                        QryPedido += Pedido.Telefono ? "TELEFONO = '".concat(Pedido.Telefono, "' , ") : "TELEFONO = null, ";
                        QryPedido += "FECHAENTREGA = '".concat(Pedido.FechaEntrega, "', ");
                        QryPedido += Pedido.Nota ? "NOTA = '".concat(Pedido.Nota, "', ") : "NOTA = null, ";
                        QryPedido += "ESTADO = 'C' ";
                        QryPedido += "WHERE ";
                        QryPedido += "VENTA_ID = ".concat(Pedido.Venta_id, ";");
                        _context6.next = 51;
                        return connection.query(QryPedido);

                      case 51:
                        QryVenta = "UPDATE venta ";
                        QryVenta += "SET ";
                        QryVenta += "MEDIOPAGO = ".concat(Venta.MedioPago, " , ");
                        QryVenta += "PRECIOTOTALVENTA = ".concat(Venta.PrecioTotalVenta, " , ");
                        QryVenta += Venta.Cliente_id ? "CLIENTE_ID = ".concat(Venta.Cliente_id, " , ") : "CLIENTE_ID = null, ";
                        QryVenta += "FECHA = '".concat(Venta.Fecha, "' , ");
                        QryVenta += "DCTO = ".concat(Venta.Dcto, " , ");
                        QryVenta += Venta.Observacion ? "OBSERVACION = '".concat(Venta.Observacion, "' ") : "OBSERVACION = null ";
                        QryVenta += "WHERE ";
                        QryVenta += "_ID = ".concat(Pedido.Venta_id, "; ");
                        _context6.next = 63;
                        return connection.query(QryVenta);

                      case 63:
                        _context6.next = 65;
                        return connection.query('COMMIT;', /*#__PURE__*/function () {
                          var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(err, rows) {
                            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    console.log("commit");
                                    res.sendStatus(200);

                                  case 2:
                                  case "end":
                                    return _context5.stop();
                                }
                              }
                            }, _callee5);
                          }));

                          return function (_x13, _x14) {
                            return _ref7.apply(this, arguments);
                          };
                        }());

                      case 65:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x11, _x12) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 13:
            _context7.next = 21;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](10);
            _context7.next = 19;
            return connection.query("ROLLBACK;");

          case 19:
            console.log("🚀rollback", _context7.t0);
            res.sendStatus(500);

          case 21:
            _context7.prev = 21;
            _context7.next = 24;
            return connection.query("COMMIT;");

          case 24:
            return _context7.finish(21);

          case 25:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[10, 15, 21, 25]]);
  }));

  return function CompletarPedido(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var CompletarPedido2 = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var _req$body2, Venta, ProductosVenta, Pedido, fx, connection1, datosProductoVenta, eliminados, nuevos, mismos, keyDatosPV, key, PV, _keyDatosPV2, estaEnMismos, _key2, _PV3, keyProductosVenta, _PV4, _estaEnMismos2, keyMismos;

    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _req$body2 = req.body, Venta = _req$body2.Venta, ProductosVenta = _req$body2.ProductosVenta, Pedido = _req$body2.Pedido;
            console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Pedido:", Pedido);
            console.log("🚀 ~ file: pedido.controller.js:116 ~ CompletarPedido ~ Venta:", Venta);
            fx = Venta.Fecha.toString();
            fx = fx.replace(/T/g, " ");
            fx = fx.replace(/Z/g, "");
            Venta.Fecha = fx;
            _context8.next = 9;
            return (0, _database.getConnection)();

          case 9:
            connection1 = _context8.sent;
            _context8.next = 12;
            return connection1.query("select * from productoventa where Venta_id = ".concat(Pedido.Venta_id));

          case 12:
            datosProductoVenta = _context8.sent;
            eliminados = [];
            nuevos = [];
            mismos = []; //identifica los que setan en ambos

            for (keyDatosPV in datosProductoVenta) {
              for (key in ProductosVenta) {
                PV = {
                  Producto_id: ProductosVenta[key]._id,
                  Cantidad: ProductosVenta[key].Cantidad,
                  PrecioVentaProducto: ProductosVenta[key].PrecioVenta > 0 ? ProductosVenta[key].PrecioVenta : ProductosVenta[key].Precio
                };

                if (PV.Producto_id === datosProductoVenta[keyDatosPV].Producto_id) {
                  //Se guardan en el array de los que ya están para hacer update
                  mismos.push(PV);
                }
              }
            } //identifica eliminados


            for (_keyDatosPV2 in datosProductoVenta) {
              estaEnMismos = false;

              for (_key2 in mismos) {
                _PV3 = {
                  Producto_id: ProductosVenta[_key2]._id
                };

                if (mismos[_key2].Producto_id === datosProductoVenta[_keyDatosPV2].Producto_id) {
                  estaEnMismos = true;
                }
              }

              if (!estaEnMismos) {
                eliminados.push(datosProductoVenta[_keyDatosPV2]);
              }
            } //identifica nuevos


            for (keyProductosVenta in ProductosVenta) {
              _PV4 = {
                Venta_id: Pedido.Venta_id,
                Producto_id: ProductosVenta[keyProductosVenta]._id,
                Cantidad: ProductosVenta[keyProductosVenta].Cantidad,
                PrecioVentaProducto: ProductosVenta[keyProductosVenta].PrecioVenta > 0 ? ProductosVenta[keyProductosVenta].PrecioVenta : ProductosVenta[keyProductosVenta].Precio
              };
              _estaEnMismos2 = false;

              for (keyMismos in mismos) {
                if (mismos[keyMismos].Producto_id === _PV4.Producto_id) {
                  _estaEnMismos2 = true;
                }
              }

              if (!_estaEnMismos2) {
                nuevos.push(_PV4);
              }
            }

            console.log("--------------MISMOS----------");
            console.log(mismos);
            console.log("--------------ELIMINADOS----------");
            console.log(eliminados);
            console.log("--------------NUEVOS----------");
            console.log(nuevos);
            console.log("--------------VENTA----------");
            console.log(Venta);
            console.log("--------------PEDIDO----------");
            console.log(Pedido);
            return _context8.abrupt("return", new Promise(function (resolve, reject) {
              (0, _databaseMysql.getConnectionMysql2)().getConnection(function (err, connection) {
                if (err) {
                  console.log("🚀 ~ file: pedido.controller.js:326 ~ getConnectionMysql2 ~ err:", err);
                  res.sendStatus(500);
                  return reject("Error occurred while getting the connection", err);
                }

                return connection.beginTransaction(function (err) {
                  if (err) {
                    console.log("🚀 ~ file: pedido.controller.js:331 ~ getConnectionMysql2 ~ err:", err);
                    connection.release();
                    res.sendStatus(500);
                    return reject("Error occurred while creating the transaction", err);
                  }

                  for (var k in mismos) {
                    connection.execute("UPDATE productoventa \n                        SET \n                        CANTIDAD = ".concat(mismos[k].Cantidad, ", \n                        PRECIOVENTAPRODUCTO = ").concat(mismos[k].PrecioVentaProducto, " \n                        WHERE \n                        VENTA_ID = ").concat(Pedido.Venta_id, " AND \n                        PRODUCTO_ID = ").concat(mismos[k].Producto_id, ";"), function (err) {
                      if (err) {
                        return connection.rollback(function () {
                          connection.release();
                          res.sendStatus(500);
                          return reject("UPDATE productoventa failed", err);
                        });
                      }
                    });
                  }

                  for (var _k3 in eliminados) {
                    connection.execute("DELETE FROM productoventa \n                        WHERE \n                        _ID = ".concat(eliminados[_k3]._id, ";"), function (err) {
                      if (err) {
                        return connection.rollback(function () {
                          connection.release();
                          res.sendStatus(500);
                          return reject("DELETE FROM productoventa failed", err);
                        });
                      }
                    });
                  }

                  for (var _k4 in nuevos) {
                    connection.execute("INSERT INTO productoventa (VENTA_ID, PRODUCTO_ID, CANTIDAD, PRECIOVENTAPRODUCTO)\n                        VALUES (?,?,?,?)", [nuevos[_k4].Venta_id, nuevos[_k4].Producto_id, nuevos[_k4].Cantidad, nuevos[_k4].PrecioVentaProducto], function (err) {
                      if (err) {
                        return connection.rollback(function () {
                          connection.release();
                          res.sendStatus(500);
                          return reject("INSERT INTO productoventa failed", err);
                        });
                      }
                    });
                  }

                  var QryPedido = "UPDATE pedido ";
                  QryPedido += "SET ";
                  QryPedido += Pedido.Direccion ? "DIRECCION = '".concat(Pedido.Direccion, "' , ") : "DIRECCION = null, ";
                  QryPedido += Pedido.Telefono ? "TELEFONO = '".concat(Pedido.Telefono, "' , ") : "TELEFONO = null, ";
                  QryPedido += "FECHAENTREGA = '".concat(Pedido.FechaEntrega, "', ");
                  QryPedido += Pedido.Nota ? "NOTA = '".concat(Pedido.Nota, "', ") : "NOTA = null, ";
                  QryPedido += "ESTADO = 'C' ";
                  QryPedido += "WHERE ";
                  QryPedido += "VENTA_ID = ".concat(Pedido.Venta_id, ";");
                  return connection.execute(QryPedido, function (err) {
                    if (err) {
                      return connection.rollback(function () {
                        connection.release();
                        return reject("UPDATE pedido failed", err);
                      });
                    }

                    var QryVenta = "UPDATE venta ";
                    QryVenta += "SET ";
                    QryVenta += "MEDIOPAGO = ".concat(Venta.MedioPago, " , ");
                    QryVenta += "PRECIOTOTALVENTA = ".concat(Venta.PrecioTotalVenta, " , ");
                    QryVenta += Venta.Cliente_id ? "CLIENTE_ID = ".concat(Venta.Cliente_id, " , ") : "CLIENTE_ID = null, ";
                    QryVenta += "FECHA = '".concat(Venta.Fecha, "' , ");
                    QryVenta += "DCTO = ".concat(Venta.Dcto, " , ");
                    QryVenta += Venta.Observacion ? "OBSERVACION = '".concat(Venta.Observacion, "' ") : "OBSERVACION = null ";
                    QryVenta += "WHERE ";
                    QryVenta += "_ID = ".concat(Pedido.Venta_id, "; ");
                    return connection.execute(QryVenta, function (err) {
                      if (err) {
                        return connection.rollback(function () {
                          connection.release();
                          return reject("UPDATE venta failed");
                        });
                      }

                      return connection.commit(function (err) {
                        if (err) {
                          return connection.rollback(function () {
                            connection.release();
                            res.sendStatus(500);
                            return reject("Commit failed");
                          });
                        }

                        connection.release();
                        res.sendStatus(200);
                      });
                    });
                  });
                });
              });
            }));

          case 30:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function CompletarPedido2(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

var CompletarPedidoRapido = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var id_venta;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            id_venta = req.body.id_venta;
            return _context9.abrupt("return", new Promise(function (resolve, reject) {
              (0, _databaseMysql.getConnectionMysql2)().getConnection(function (err, connection) {
                if (err) {
                  console.log("🚀 ~ file: pedido.controller.js:530 ~ getConnectionMysql2 ~ err:", err);
                  res.sendStatus(500);
                  return reject("Error occurred while getting the connection", err);
                }

                return connection.beginTransaction(function (err) {
                  if (err) {
                    console.log("🚀 ~ file: pedido.controller.js:535 ~ getConnectionMysql2 ~ err:", err);
                    connection.release();
                    res.sendStatus(500);
                    return reject("Error occurred while creating the transaction", err);
                  }

                  var QryPedido = "UPDATE pedido ";
                  QryPedido += "SET ";
                  QryPedido += "ESTADO = 'C' ";
                  QryPedido += "WHERE ";
                  QryPedido += "VENTA_ID = ".concat(id_venta, ";");
                  connection.execute(QryPedido, function (err) {
                    if (err) {
                      return connection.rollback(function () {
                        connection.release();
                        res.sendStatus(500);
                        return reject("UPDATE pedido failed", err);
                      });
                    }

                    var QryVenta = "UPDATE venta ";
                    QryVenta += "SET ";
                    QryVenta += "FECHA = UTC_DATE ";
                    QryVenta += "WHERE ";
                    QryVenta += "_ID = ".concat(id_venta, "; ");
                    connection.execute(QryVenta, function (err) {
                      if (err) {
                        return connection.rollback(function () {
                          connection.release();
                          res.sendStatus(500);
                          return reject("UPDATE venta failed", err);
                        });
                      }

                      return connection.commit(function (err) {
                        if (err) {
                          return connection.rollback(function () {
                            connection.release();
                            res.sendStatus(500);
                            return reject("Commit failed");
                          });
                        }

                        connection.release();
                        res.sendStatus(200);
                      });
                    });
                  });
                });
              });
            }));

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function CompletarPedidoRapido(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

var methods = {
  getPedidos: getPedidos,
  deletePedido: deletePedido,
  getPedido: getPedido,
  CompletarPedido: CompletarPedido,
  CompletarPedido2: CompletarPedido2,
  CompletarPedidoRapido: CompletarPedidoRapido
};
exports.methods = methods;