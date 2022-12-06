// LICENSE : MIT
"use strict";

/*
    (f) Textlint rule definition for personal use.
*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _matchTokenStream = _interopRequireDefault(require("./../matchTokenStream"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var PRONOUN_TABLE = [{
  forbidden_form: "わたし",
  preferred_form: "私"
}, {
  forbidden_form: "かれ",
  preferred_form: "彼"
}];
var ADVERB_TABLE = [{
  forbidden_form: "さらに",
  preferred_form: "更に"
}, {
  forbidden_form: "すでに",
  preferred_form: "既に"
}];
var NOUN_TABLE = [{
  forbidden_form: "打ち合わせ",
  preferred_form: "打合せ"
}, {
  forbidden_form: "受け付け",
  preferred_form: "受付"
}];
var matchPattern代名詞漢字書き = (0, _matchTokenStream.default)([{
  "pos": "名詞",
  "pos_detail_1": "代名詞"
}]);
var matchPattern副詞漢字書き = (0, _matchTokenStream.default)([{
  "pos": "副詞"
}]);
var matchPattern接続詞かな書き = (0, _matchTokenStream.default)([{
  "pos": "接続詞"
}]);
var matchPattern感動詞かな書き = (0, _matchTokenStream.default)([{
  "pos": "感動詞"
}]);
var matchPattern名詞送り仮名 = (0, _matchTokenStream.default)([{
  "pos": "名詞"
}]);

/**
 * Find the forbidden particle from the user-defined table.
 * If exists return the preferred form, else return null.
 *
 * @param {string} surface_form surface_form in kuromojin.
 * @param {Object} formTable
 * @return {object} Object contains forbidden_form&preferred_form.
 */
function findForbidden(surface_form, formTable) {
  for (var i = 0; i < formTable.length; i++) {
    if (surface_form == formTable[i]["forbidden_form"]) {
      return formTable[i];
    }
  }
  return;
}
;

/**
 * Check whether the given string contains kanji characters.
 *
 * @param {string} val The text to be valuated.
 * @return {boolean} True: yes, False, no.
 */
function isContainsKanji(val) {
  var regexp = /((?:[\u3005\u3007\u303B\u3400-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF])(?:[\uFE00-\uFE02]|\uDB40[\uDD00-\uDDEF])?)/m;
  return regexp.test(val);
}
;

/**
 * Convert katakana to hiragana for the given string.
 *
 * @param {string} str The text to be converted.
 * @return {string} Hiragana string.
 */
function convertKanaToHira(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    var chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}
;
function _default(context) {
  var {
    RuleError,
    fixer
  } = context;
  return token => {
    if (matchPattern代名詞漢字書き(token) == true) {
      var forbbidenExist = findForbidden(token.surface_form, PRONOUN_TABLE);
      if (forbbidenExist != undefined) {
        return new RuleError("\u4EE3\u540D\u8A5E\u6F22\u5B57\u66F8\u304D: ".concat(forbbidenExist["forbidden_form"]), {
          index: token.word_position - 1,
          fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], forbbidenExist["preferred_form"])
        });
      }
    }
    ;
    if (matchPattern副詞漢字書き(token) == true) {
      var forbbidenExist = findForbidden(token.surface_form, ADVERB_TABLE);
      if (forbbidenExist != undefined) {
        return new RuleError("\u526F\u8A5E\u6F22\u5B57\u66F8\u304D: ".concat(forbbidenExist["forbidden_form"]), {
          index: token.word_position - 1,
          fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], forbbidenExist["preferred_form"])
        });
      }
    }
    ;
    if (matchPattern接続詞かな書き(token) == true) {
      var kanjiFlag = isContainsKanji(token.surface_form);
      if (kanjiFlag == true) {
        return new RuleError("\u63A5\u7D9A\u8A5E\u304B\u306A\u66F8\u304D: ".concat(token.surface_form), {
          index: token.word_position - 1,
          fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], convertKanaToHira(token.reading))
        });
      }
    }
    ;
    if (matchPattern名詞送り仮名(token) == true) {
      var forbbidenExist = findForbidden(token.surface_form, NOUN_TABLE);
      if (forbbidenExist != undefined) {
        return new RuleError("\u540D\u8A5E\u9001\u308A\u4EEE\u540D: ".concat(forbbidenExist["forbidden_form"]), {
          index: token.word_position - 1,
          fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], forbbidenExist["preferred_form"])
        });
      }
    }
    ;
  };
}
//# sourceMappingURL=rule-define.js.map