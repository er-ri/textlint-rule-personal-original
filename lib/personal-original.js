"use strict";

var _kuromojin = require("kuromojin");
var _ruleDefine = _interopRequireDefault(require("./rules/rule-define"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var reporter = function reporter(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var {
    Syntax,
    getSource,
    RuleError,
    report,
    fixer,
    locator
  } = context;
  var rule接続詞かな書き = (0, _ruleDefine.default)(context);
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
          pushError(rule接続詞かな書き(token));
        });
      }).then(() => {
        results.forEach(error => {
          report(node, error);
        });
      });
    }
  };
};
module.exports = {
  linter: reporter,
  fixer: reporter
};
//# sourceMappingURL=personal-original.js.map