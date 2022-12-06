"use strict";

var _kuromojin = require("kuromojin");
var _sentenceSplitter = require("sentence-splitter");
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

  // Only the first rule in `rule-define.js` is required, the other rules will be executed automatically.
  var rule代名詞漢字書き = (0, _ruleDefine.default)(context);
  return {
    [Syntax.Paragraph](node) {
      var text = getSource(node);

      // Check paragraph length.
      if (text.length > 120) {
        return new RuleError("1\u6BB5\u843D\u9577\u3055\u304C120\u6587\u5B57\u8D85\u3048\u3066\u3044\u308B: ".concat(text.slice(0, 10) + '...'));
      }

      // Check every sentences length.
      var sentences = (0, _sentenceSplitter.split)(text);
      sentences.forEach(sentence => {
        if (sentence.type === "Sentence" && sentence.raw.length > 40) {
          var ruleError = new RuleError("1\u6587\u9577\u3055\u304C40\u6587\u5B57\u8D85\u3048\u3066\u3044\u308B: ".concat(sentence.raw.slice(0, 10) + '...'), {
            start: sentence.loc.start
          });
          report(node, ruleError);
        }
      });
    },
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
          pushError(rule代名詞漢字書き(token));
          // pushError(rule副詞漢字書き(token));
          // pushError(rule接続詞かな書き(token));
          // pushError(rule名詞送り仮名(token));
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