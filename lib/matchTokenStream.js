// LICENSE : MIT
"use strict";

/**
 * expectShape
 * [expectShape | expectShape]
 * にどれかにマッチするならtrueを返す
 * @param {*} token
 * @param {*|*[]} expectShape
 *  orでマッチしたい場合は配列を渡す
 * @returns {boolean}
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expectTokenStream;
function matchToken(token, expectShape) {
  if (Array.isArray(expectShape)) {
    return expectShape.some(singleExpectShape => matchToken(token, singleExpectShape));
  }
  return Object.keys(expectShape).every(key => {
    var actualValue = token[key];
    // 値は複数の場合もある
    var expectedValues = Array.isArray(expectShape[key]) ? expectShape[key] : [expectShape[key]];
    return expectedValues.some(expectedValue => {
      return actualValue === expectedValue;
    });
  });
}
function expectTokenStream(tokenStream) {
  var currentTokenPosition = 0;
  var tokenCount = tokenStream.length;
  return token => {
    var expectedToken = tokenStream[currentTokenPosition];
    if (matchToken(token, expectedToken)) {
      currentTokenPosition += 1;
    } else {
      // restart
      currentTokenPosition = 0;
    }
    // match
    if (currentTokenPosition === tokenCount) {
      // match -> reset
      currentTokenPosition = 0;
      return true;
    }
    return false;
  };
}
//# sourceMappingURL=matchTokenStream.js.map