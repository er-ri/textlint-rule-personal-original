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
  forbidden_form: "従って",
  preferred_form: "したがって"
}];
var NOUN_TABLE = [{
  forbidden_form: "打ち合わせ",
  preferred_form: "打合せ"
}, {
  forbidden_form: "受け付け",
  preferred_form: "受付"
}];
function findForbidden(surface_form, formTable) {
  for (var i = 0; i < formTable.length; i++) {
    if (surface_form == formTable[i]["forbidden_form"]) {
      return formTable[i];
    }
  }
  return;
}
function _default(context) {
  var {
    RuleError,
    fixer
  } = context;
  var matchPattern接続詞かな書き = (0, _matchTokenStream.default)([{
    "pos": "接続詞"
  }]);
  var matchPattern名詞送り仮名 = (0, _matchTokenStream.default)([{
    "pos": "名詞"
  }]);
  return token => {
    var forbbidenExist;
    if (matchPattern接続詞かな書き(token) == true) {
      forbbidenExist = findForbidden(token.surface_form, CONJUNCTION_TABLE);
      if (forbbidenExist != undefined) {
        return new RuleError("\u63A5\u7D9A\u8A5E\u304B\u306A\u66F8\u304D: ".concat(forbbidenExist["forbidden_form"]), {
          index: token.word_position - 1,
          fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "または")
        });
      }
    }
    if (matchPattern名詞送り仮名(token) == true) {
      forbbidenExist = findForbidden(token.surface_form, NOUN_TABLE);
      if (forbbidenExist != undefined) {
        return new RuleError("\u540D\u8A5E\u9001\u308A\u4EEE\u540D: ".concat(forbbidenExist["forbidden_form"]), {
          index: token.word_position - 1,
          fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "または")
        });
      }
    }
  };
}
//# sourceMappingURL=rule-define.js.map