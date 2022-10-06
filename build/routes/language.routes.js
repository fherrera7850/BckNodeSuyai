"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _language = require("./../controllers/language.controller");

var router = (0, _express.Router)();
router.get("/", _language.methods.getLanguages);
router.get("/:id", _language.methods.getLanguage);
router.post("/", _language.methods.addLanguage);
router.put("/:id", _language.methods.updateLanguage);
router["delete"]("/:id", _language.methods.deleteLanguage);
var _default = router;
exports["default"] = _default;