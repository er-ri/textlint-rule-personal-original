"use strict";

var _kuromojin = require("kuromojin");
var _sentenceSplitter = require("sentence-splitter");
var _ruleDefine = _interopRequireDefault(require("./rules/rule-define"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var {
  PHRASE_TABLE
} = require('./rules/phrase-table');
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
  var ruleかな漢字書き = (0, _ruleDefine.default)(context);
  return {
    [Syntax.Paragraph](node) {
      var text = getSource(node);

      // Check paragraph length.
      // if(text.length > 120){
      //     return new RuleError(`1段落長さが120文字超えている: ${text.slice(0, 10) + '...'}`);
      // }

      // Check every sentences length.
      var sentences = (0, _sentenceSplitter.split)(text);
      sentences.forEach(sentence => {
        if (sentence.type === "Sentence" && sentence.raw.length > 40) {
          var ruleError = new RuleError("1\u6587\u9577\u3055\u304C40\u6587\u5B57\u8D85\u3048\u3066\u3044\u308B: ".concat(sentence.raw.slice(0, 10) + '...'), {
            start: sentence.loc.start
          });
          report(node, ruleError);
        }

        // Replace forbidden phrases for the every sentences using Regular Expression.
        for (var i = 0; i < PHRASE_TABLE.length; i++) {
          var phrase = PHRASE_TABLE[i]['forbidden_phrase'];
          var phrase_regex = PHRASE_TABLE[i]['forbidden_regex'];
          var re = new RegExp(phrase_regex, 'ig');
          for (var match of sentence.raw.matchAll(re)) {
            if (match) {
              report(node, new RuleError("".concat(PHRASE_TABLE[i]['warning_message'], ": ").concat(phrase), {
                padding: locator.range([match.index, match.index + phrase.length]),
                fix: fixer.replaceTextRange([match.index, match.index + phrase.length], PHRASE_TABLE[i]['preferred_phrase'])
              }));
            }
          }
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
          pushError(ruleかな漢字書き(token));
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