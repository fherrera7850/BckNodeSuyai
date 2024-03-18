"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;

var _mysql2promise = require("./../database/mysql2promise");

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addVenta = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, Venta, ProductosVenta, Pedido, fx, connection, _yield$connection$que, _yield$connection$que2, resVenta, fieldsVenta, idVenta, key, PV;

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
            return (0, _mysql2promise.getConnection)();

          case 9:
            connection = _context.sent;
            _context.prev = 10;
            _context.next = 13;
            return connection.query('START TRANSACTION');

          case 13:
            _context.next = 15;
            return connection.query("INSERT INTO venta SET ?", Venta);

          case 15:
            _yield$connection$que = _context.sent;
            _yield$connection$que2 = _slicedToArray(_yield$connection$que, 2);
            resVenta = _yield$connection$que2[0];
            fieldsVenta = _yield$connection$que2[1];
            idVenta = resVenta.insertId;
            console.log("🚀 ~ file: venta.controller.js:19 ~ addVenta ~ idVenta", idVenta);
            _context.t0 = _regeneratorRuntime().keys(ProductosVenta);

          case 22:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 30;
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
            _context.next = 28;
            return connection.query("INSERT INTO productoventa SET ?", PV);

          case 28:
            _context.next = 22;
            break;

          case 30:
            console.log("🚀 ~ file: venta.controller.js:34 ~ addVenta ~ Pedido", Pedido);

            if (!Pedido) {
              _context.next = 37;
              break;
            }

            Pedido.Venta_id = idVenta;
            console.log("🚀 --------HACE INSERT DE PEDIDO-------"); //quita campo GuardarCambios del json

            if (Pedido.hasOwnProperty('GuardarCambios')) {
              delete Pedido.GuardarCambios;
            }

            _context.next = 37;
            return connection.query("INSERT INTO pedido SET ?", Pedido);

          case 37:
            _context.next = 39;
            return connection.query("COMMIT;");

          case 39:
            console.log("commit");
            res.sendStatus(200);
            _context.next = 49;
            break;

          case 43:
            _context.prev = 43;
            _context.t2 = _context["catch"](10);
            _context.next = 47;
            return connection.query("ROLLBACK;");

          case 47:
            console.log("🚀rollback", _context.t2);
            res.sendStatus(500);

          case 49:
            _context.prev = 49;
            _context.next = 52;
            return connection.query("COMMIT;");

          case 52:
            return _context.finish(49);

          case 53:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 43, 49, 53]]);
  }));

  return function addVenta(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getVenta = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _id, connection, qry, _yield$connection$que3, _yield$connection$que4, resultVenta, fieldsVenta;

    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _id = req.params._id;
            console.log("🚀 ~ file: venta.controller.js:92 ~ getVenta ~ req.body", req.body);
            _context2.next = 5;
            return (0, _mysql2promise.getConnection)();

          case 5:
            connection = _context2.sent;
            qry = "CALL Sel_DetalleVentaProductos(".concat(_id, ");");
            _context2.next = 9;
            return connection.query(qry);

          case 9:
            _yield$connection$que3 = _context2.sent;
            _yield$connection$que4 = _slicedToArray(_yield$connection$que3, 2);
            resultVenta = _yield$connection$que4[0];
            fieldsVenta = _yield$connection$que4[1];
            res.json(resultVenta[0]);
            _context2.next = 21;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
            res.status(500);
            res.send(_context2.t0.toString());

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
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
            return (0, _mysql2promise.getConnection)();

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
    var connection, qry, _yield$connection$que5, _yield$connection$que6, resultAgrupados, fieldsAgrupados, qry2, _yield$connection$que7, _yield$connection$que8, resultVentas, fieldsVentas;

    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _mysql2promise.getConnection)();

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
            _yield$connection$que5 = _context4.sent;
            _yield$connection$que6 = _slicedToArray(_yield$connection$que5, 2);
            resultAgrupados = _yield$connection$que6[0];
            fieldsAgrupados = _yield$connection$que6[1];

            if (!(resultAgrupados.length > 0)) {
              _context4.next = 39;
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
            _context4.next = 30;
            return connection.query(qry2);

          case 30:
            _yield$connection$que7 = _context4.sent;
            _yield$connection$que8 = _slicedToArray(_yield$connection$que7, 2);
            resultVentas = _yield$connection$que8[0];
            fieldsVentas = _yield$connection$que8[1];
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
            _context4.next = 40;
            break;

          case 39:
            res.json({
              ErrorMessage: "No hay ventas para mostrar"
            });

          case 40:
            _context4.next = 47;
            break;

          case 42:
            _context4.prev = 42;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);
            res.status(500);
            res.send(_context4.t0.toString());

          case 47:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 42]]);
  }));

  return function getHistorial30Dias(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getEstadisticas = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var connection, ObjEstadisticas, qryTotales, _yield$connection$que9, _yield$connection$que10, resultTotales, fieldsResultTotales, qryMediosDePago, _yield$connection$que11, _yield$connection$que12, resultMediosDePago, fieldsResultMediosDePago, qryMasVendidos, _yield$connection$que13, _yield$connection$que14, resultMasVendidos, fieldsResultMasVendidos;

    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _mysql2promise.getConnection)();

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
            _yield$connection$que9 = _context5.sent;
            _yield$connection$que10 = _slicedToArray(_yield$connection$que9, 2);
            resultTotales = _yield$connection$que10[0];
            fieldsResultTotales = _yield$connection$que10[1];
            console.log("🚀 ~  resultTotales 1era query", resultTotales);
            qryMediosDePago = "CALL Sel_EstadisticasMediosDePago('" + req.params.FechaInicio + "', '" + req.params.FechaFin + "');";
            _context5.next = 16;
            return connection.query(qryMediosDePago);

          case 16:
            _yield$connection$que11 = _context5.sent;
            _yield$connection$que12 = _slicedToArray(_yield$connection$que11, 2);
            resultMediosDePago = _yield$connection$que12[0];
            fieldsResultMediosDePago = _yield$connection$que12[1];
            console.log("🚀 ~  resultMediosDePago 2da consulta", resultMediosDePago);
            qryMasVendidos = "CALL Sel_EstadisticasProductosMasVendidos('" + req.params.FechaInicio + "', '" + req.params.FechaFin + "');";
            _context5.next = 24;
            return connection.query(qryMasVendidos);

          case 24:
            _yield$connection$que13 = _context5.sent;
            _yield$connection$que14 = _slicedToArray(_yield$connection$que13, 2);
            resultMasVendidos = _yield$connection$que14[0];
            fieldsResultMasVendidos = _yield$connection$que14[1];
            console.log("🚀 ~ resultMasVendidos 3eraq comsultas", resultMasVendidos);

            if (resultTotales.length > 0) {
              ObjEstadisticas.Generales = resultTotales[0]; //pq trae la consulta como array y es solo 1 objeto

              ObjEstadisticas.MediosDePago = resultMediosDePago[0];
              ObjEstadisticas.MasVendidos = resultMasVendidos[0];
            }

            res.json(ObjEstadisticas);
            _context5.next = 38;
            break;

          case 33:
            _context5.prev = 33;
            _context5.t0 = _context5["catch"](0);
            res.status(500);
            res.send(_context5.t0.message);
            console.log("🚀 ~ file: venta.controller.js:207 ~ getEstadisticas ~ error", _context5.t0);

          case 38:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 33]]);
  }));

  return function getEstadisticas(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
/* const getBoletaDiaria = async (req, res) => {
    try {
        const { Fecha } = req.params
        const connection = await getConnection();

        const fechaFormateadaYYYYMMDD = moment(Fecha).format("YYYY-MM-DD");

        let qry = `select
        round((sum(v.PrecioTotalVenta) * 0.9)) as MontoBoleta
        from venta v inner join pedido p on p.Venta_id=v._id 
        where p.Estado = 'C' and DATE(CONVERT_TZ(v.Fecha, 'UTC', 'America/Buenos_Aires')) = '${fechaFormateadaYYYYMMDD}' and v.MedioPago <> 2;`

        const [result, fields] = await connection.query(qry);
        console.log("🚀 ~ getBoletaDiaria ~ result:", result)

        const response = {
            "Fecha": moment(Fecha).format("DD-MM-YYYY"),
            "MontoBoleta": result[0].MontoBoleta
        }

        res.json(response);

    } catch (error) {
        console.error(error)
        res.status(500);
        res.send(error.toString());
    }
}; */


var methods = {
  addVenta: addVenta,
  getHistorial30Dias: getHistorial30Dias,
  getEstadisticas: getEstadisticas,
  getVenta: getVenta,
  deleteVenta: deleteVenta //getBoletaDiaria

};
exports.methods = methods;