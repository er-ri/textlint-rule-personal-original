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
    RuleError,
    fixer
  } = context;
  var matchPattern又はかな書き = (0, _matchTokenStream.default)([{
    "pos": "接続詞",
    "surface_form": "又は"
  }]);
  var matchPattern若しくはかな書き = (0, _matchTokenStream.default)([{
    "pos": "接続詞",
    "surface_form": "若しくは"
  }]);
  var matchPattern打ち合わせ送り仮名 = (0, _matchTokenStream.default)([{
    "pos": "名詞",
    "surface_form": "打ち合わせ"
  }]);
  return token => {
    if (matchPattern又はかな書き(token)) {
      return new RuleError("接続詞かな書き: 又は", {
        index: token.word_position - 1,
        fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "または")
      });
    }
    if (matchPattern若しくはかな書き(token)) {
      return new RuleError("接続詞かな書き: 若しくは", {
        index: token.word_position - 1,
        fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "もしくは")
      });
    }
    if (matchPattern打ち合わせ送り仮名(token)) {
      return new RuleError("送り仮名: 打ち合わせ", {
        index: token.word_position - 1,
        fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "打合せ")
      });
    }
  };
}
//# sourceMappingURL=rule-define.js.map