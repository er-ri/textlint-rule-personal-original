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
function _default(context) {
  var {
    RuleError
  } = context;
  var matchPattern又はかな書き = (0, _matchTokenStream.default)([{
    "pos": "接続詞",
    "surface_form": "又は"
  }]);
  var matchPattern若しくはかな書き = (0, _matchTokenStream.default)([{
    "pos": "接続詞",
    "surface_form": "若しくは"
  }]);
  return token => {
    if (matchPattern又はかな書き(token)) {
      return new RuleError("接続詞かな書き: 又は", {
        index: token.word_position - 1
      });
    }
    if (matchPattern若しくはかな書き(token)) {
      return new RuleError("接続詞かな書き: 若しくは", {
        index: token.word_position - 1
      });
    }
  };
}
//# sourceMappingURL=rule-define.js.map