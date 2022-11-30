// LICENSE : MIT
"use strict";

/*
    (f) 接続詞かな書き
*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _matchTokenStream = _interopRequireDefault(require("./../matchTokenStream"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var CONJUNCTION_TABLE = [{
  forbidden_form: "追って",
  preferred_form: "おって"
}, {
  forbidden_form: "且つ",
  preferred_form: "かつ"
}];
function findForbidden(surface_form, formTable) {}
function _default(context) {
  var {
    RuleError,
    fixer
  } = context;
  var forbidden_list = CONJUNCTION_TABLES.forbidden_form;
  var matchPattern接続詞かな書き = (0, _matchTokenStream.default)([{
    "pos": "接続詞"
  }]);
  return token => {
    if (matchPattern接続詞かな書き(token) == true && token.surface_form == "kkkk") {
      return new RuleError("接続詞かな書き: 又は", {
        index: token.word_position - 1,
        fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "または")
      });
    }
  };
}
//# sourceMappingURL=rule-define.js.map