"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;

var _database = require("./../database/database");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addVenta = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, Venta, ProductosVenta, Pedido, fx, connection, resVenta, idVenta, key, PV;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, Venta = _req$body.Venta, ProductosVenta = _req$body.ProductosVenta, Pedido = _req$body.Pedido;
            fx = Venta.Fecha.toString();
            fx = fx.replace(/T/g, " ");
            fx = fx.replace(/Z/g, "");
            Venta.Fecha = fx;
            if (Pedido) Pedido.FechaCreacion = fx;
            console.log("🚀 ~ file: venta.controller.js ~ line 8 ~ addVenta ~ fx", fx);
            _context.next = 9;
            return (0, _database.getConnection)();

          case 9:
            connection = _context.sent;
            _context.prev = 10;
            _context.next = 13;
            return connection.query('START TRANSACTION');

          case 13:
            _context.next = 15;
            return connection.query("INSERT INTO venta SET ?", Venta);

          case 15:
            resVenta = _context.sent;
            idVenta = resVenta.insertId;
            console.log("🚀 ~ file: venta.controller.js:19 ~ addVenta ~ idVenta", idVenta);
            _context.t0 = _regeneratorRuntime().keys(ProductosVenta);

          case 19:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 27;
              break;
            }

            key = _context.t1.value;
            PV = {
              Venta_id: idVenta,
              Producto_id: ProductosVenta[key]._id,
              Cantidad: ProductosVenta[key].Cantidad,
              PrecioVentaProducto: ProductosVenta[key].PrecioVenta > 0 ? ProductosVenta[key].PrecioVenta : ProductosVenta[key].Precio
            };
            console.log("🚀 ~ file: venta.controller.js:27 ~ addVenta ~ PV", PV);
            _context.next = 25;
            return connection.query("INSERT INTO productoventa SET ?", PV);

          case 25:
            _context.next = 19;
            break;

          case 27:
            console.log("🚀 ~ file: venta.controller.js:34 ~ addVenta ~ Pedido", Pedido);

            if (!Pedido) {
              _context.next = 33;
              break;
            }

            Pedido.Venta_id = idVenta;
            console.log("🚀 --------HACE INSERT DE PEDIDO-------");
            _context.next = 33;
            return connection.query("INSERT INTO pedido SET ?", Pedido);

          case 33:
            _context.next = 35;
            return connection.query("COMMIT;");

          case 35:
            console.log("commit");
            res.sendStatus(200);
            _context.next = 45;
            break;

          case 39:
            _context.prev = 39;
            _context.t2 = _context["catch"](10);
            _context.next = 43;
            return connection.query("ROLLBACK;");

          case 43:
            console.log("🚀rollback", _context.t2);
            res.sendStatus(500);

          case 45:
            _context.prev = 45;
            _context.next = 48;
            return connection.query("COMMIT;");

          case 48:
            return _context.finish(45);

          case 49:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 39, 45, 49]]);
  }));

  return function addVenta(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getVenta = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _id, connection, qry, resultVenta;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _id = req.params._id;
            console.log("🚀 ~ file: venta.controller.js:92 ~ getVenta ~ req.body", req.body);
            _context2.next = 5;
            return (0, _database.getConnection)();

          case 5:
            connection = _context2.sent;
            qry = "CALL Sel_DetalleVentaProductos(".concat(_id, ");");
            _context2.next = 9;
            return connection.query(qry);

          case 9:
            resultVenta = _context2.sent;
            res.json(resultVenta[0]);
            _context2.next = 18;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            res.status(500);
            res.send(_context2.t0.toString());

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function getVenta(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var deleteVenta = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _id, connection;

    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = req.params._id;
            _context3.next = 3;
            return (0, _database.getConnection)();

          case 3:
            connection = _context3.sent;
            _context3.prev = 4;
            _context3.next = 7;
            return connection.query('START TRANSACTION;');

          case 7:
            _context3.next = 9;
            return connection.query("DELETE FROM venta WHERE _id=".concat(_id, ";"));

          case 9:
            _context3.next = 11;
            return connection.query("COMMIT;");

          case 11:
            console.log("commit");
            res.sendStatus(200);
            _context3.next = 21;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](4);
            _context3.next = 19;
            return connection.query("ROLLBACK;");

          case 19:
            console.log("🚀rollback", _context3.t0);
            res.sendStatus(500);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 15]]);
  }));

  return function deleteVenta(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getHistorial30Dias = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var connection, qry, resultAgrupados, qry2, resultVentas;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _database.getConnection)();

          case 3:
            connection = _context4.sent;
            qry = 'SELECT count(_id) as NroVentas,sum(Preciototalventa) as SumaVentas, DATE_FORMAT(DATE_SUB(fecha, INTERVAL 3 HOUR), "%Y-%m-%d") as FechaVenta ';
            qry += 'from venta ';
            qry += 'WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day) ';
            qry += 'and _id not in (select Venta_id from pedido where Estado = "I") ';
            qry += 'GROUP by FechaVenta ';
            qry += 'order by FechaVenta desc';
            console.log("🚀 ~ file: venta.controller.js ~ line 48 ~ getHistorial30Dias ~ qry", qry);
            _context4.next = 13;
            return connection.query(qry);

          case 13:
            resultAgrupados = _context4.sent;

            if (!(resultAgrupados.length > 0)) {
              _context4.next = 33;
              break;
            }

            resultAgrupados.forEach(function (element) {
              return element.Ventas = [];
            });
            qry2 = 'SELECT v._id, sum(pv.Cantidad) CantidadItems, v.PrecioTotalVenta,v.MedioPago,c.Nombre Cliente, DATE_FORMAT(DATE_SUB(v.fecha, INTERVAL 3 HOUR), "%Y-%m-%dT%H:%i:%s") as Fecha, v.observacion as Observacion,CONCAT(TRIM(c.Calle), ", ", TRIM(c.Comuna)) Direccion ';
            qry2 += 'from venta v left join cliente c ';
            qry2 += 'on v.Cliente_id=c._id ';
            qry2 += 'left join productoventa pv ';
            qry2 += 'on pv.Venta_id=v._id ';
            qry2 += 'WHERE v.fecha >= DATE_SUB(CURDATE(), INTERVAL 30 day)  ';
            qry2 += 'and v._id not in (select Venta_id from pedido where Estado = "I") ';
            qry2 += 'GROUP by v._id ';
            qry2 += 'order by v.fecha desc; ';
            _context4.next = 27;
            return connection.query(qry2);

          case 27:
            resultVentas = _context4.sent;
            //console.log(resultAgrupados[0], resultVentas[0])
            resultAgrupados.forEach(function (parent) {
              resultVentas.forEach(function (child) {
                if (parent.FechaVenta === child.Fecha.split("T")[0]) {
                  parent.Ventas.push(child);
                }
              });
            });
            res.json(resultAgrupados);
            res.status(200);
            _context4.next = 34;
            break;

          case 33:
            res.json({
              ErrorMessage: "No hay ventas para mostrar"
            });

          case 34:
            _context4.next = 41;
            break;

          case 36:
            _context4.prev = 36;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            res.status(500);
            res.send(_context4.t0.toString());

          case 41:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 36]]);
  }));

  return function getHistorial30Dias(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getEstadisticas = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var connection, ObjEstadisticas, qryTotales, resultTotales, qryMediosDePago, resultMediosDePago, qryMasVendidos, resultMasVendidos;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _database.getConnection)();

          case 3:
            connection = _context5.sent;
            ObjEstadisticas = {
              Generales: null,
              MasVendidos: null,
              MediosDePago: null
            };
            qryTotales = "CALL Sel_EstadisticasGenerales('" + req.params.FechaInicio + "', '" + req.params.FechaFin + "');";
            _context5.next = 8;
            return connection.query(qryTotales);

          case 8:
            resultTotales = _context5.sent;
            console.log("🚀 ~  resultTotales 1era query", resultTotales);
            qryMediosDePago = "CALL Sel_EstadisticasMediosDePago('" + req.params.FechaInicio + "', '" + req.params.FechaFin + "');";
            _context5.next = 13;
            return connection.query(qryMediosDePago);

          case 13:
            resultMediosDePago = _context5.sent;
            console.log("🚀 ~  resultMediosDePago 2da consulta", resultMediosDePago);
            qryMasVendidos = "CALL Sel_EstadisticasProductosMasVendidos('" + req.params.FechaInicio + "', '" + req.params.FechaFin + "');";
            _context5.next = 18;
            return connection.query(qryMasVendidos);

          case 18:
            resultMasVendidos = _context5.sent;
            console.log("🚀 ~ resultMasVendidos 3eraq comsultas", resultMasVendidos);

            if (resultTotales.length > 0) {
              ObjEstadisticas.Generales = resultTotales[0]; //pq trae la consulta como array y es solo 1 objeto

              ObjEstadisticas.MediosDePago = resultMediosDePago[0];
              ObjEstadisticas.MasVendidos = resultMasVendidos[0];
            }

            res.json(ObjEstadisticas);
            _context5.next = 29;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](0);
            res.status(500);
            res.send(_context5.t0.message);
            console.log("🚀 ~ file: venta.controller.js:207 ~ getEstadisticas ~ error", _context5.t0);

          case 29:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 24]]);
  }));

  return function getEstadisticas(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var methods = {
  addVenta: addVenta,
  getHistorial30Dias: getHistorial30Dias,
  getEstadisticas: getEstadisticas,
  getVenta: getVenta,
  deleteVenta: deleteVenta
};
exports.methods = methods;