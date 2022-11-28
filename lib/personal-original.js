"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _kuromojin = require("kuromojin");
var _ruleDefine = _interopRequireDefault(require("./rules/rule-define"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default(context) {
  var {
    Syntax,
    getSource,
    RuleError,
    report,
    locator
  } = context;
  var rule又はかな書き = (0, _ruleDefine.default)(context);
  var rule若しくはかな書き = (0, _ruleDefine.default)(context);
  var rule打ち合わせ送り仮名 = (0, _ruleDefine.default)(context);
  return {
    [Syntax.Str](node) {
      var text = getSource(node);
      var results = [];
      var pushError = error => {
        if (error) {
          results.push(error);
        }
      };
      return (0, _kuromojin.tokenize)(text).then(tokens => {
        tokens.forEach(token => {
          pushError(rule又はかな書き(token));
          pushError(rule若しくはかな書き(token));
          pushError(rule打ち合わせ送り仮名(token));
        });
      }).then(() => {
        results.forEach(error => {
          report(node, error);
        });
      });
    }
  };
}
//# sourceMappingURL=personal-original.js.map