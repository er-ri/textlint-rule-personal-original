// LICENSE : MIT
"use strict";
/*
    (f) Textlint rule definition for personal use.
*/
import matchTokenStream from "./../matchTokenStream";

const PRONOUN_TABLE = [
    {
        forbidden_form: "わたし",
        preferred_form: "私"
    },
    {
        forbidden_form: "かれ",
        preferred_form: "彼"
    }
];

const ADVERB_TABLE = [
    {
        forbidden_form: "さらに",
        preferred_form: "更に"
    },
    {
        forbidden_form: "すでに",
        preferred_form: "既に"
    }
];

const NOUN_TABLE = [
    {
        forbidden_form: "打ち合わせ",
        preferred_form: "打合せ"
    },
    {
        forbidden_form: "受け付け",
        preferred_form: "受付"
    }
];

const matchPattern代名詞漢字書き = matchTokenStream([
    {
        "pos": "名詞",
        "pos_detail_1": "代名詞"
    }
]);

const matchPattern副詞漢字書き = matchTokenStream([
    {
        "pos": "副詞"
    }
]);

const matchPattern接続詞かな書き = matchTokenStream([
    {
        "pos": "接続詞"
    }
]);

const matchPattern感動詞かな書き = matchTokenStream([
    {
        "pos": "感動詞"
    }
]);

const matchPattern名詞送り仮名 = matchTokenStream([
    {
        "pos": "名詞"
    }
]);

/**
 * Find the forbidden particle from the user-defined table.
 * If exists return the preferred form, else return null.
 *
 * @param {string} surface_form surface_form in kuromojin.
 * @param {Object} formTable
 * @return {object} Object contains forbidden_form&preferred_form.
 */
function findForbidden(surface_form, formTable){
    for(var i = 0; i < formTable.length; i++){
        if(surface_form == formTable[i]["forbidden_form"]){
            return formTable[i];
        }
    }
    return;
};

/**
 * Check whether the given string contains kanji characters.
 *
 * @param {string} val The text to be valuated.
 * @return {boolean} True: yes, False, no.
 */
function isContainsKanji(val) {
    var regexp = /([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu;
    return regexp.test(val);
};

/**
 * Convert katakana to hiragana for the given string.
 *
 * @param {string} str The text to be converted.
 * @return {string} Hiragana string.
 */
function convertKanaToHira(str) {
    return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
};

export default function (context) {
    const {RuleError, fixer} = context;

    return (token) => {        
        if (matchPattern代名詞漢字書き(token) == true) {
            var forbbidenExist = findForbidden(token.surface_form, PRONOUN_TABLE);
            if(forbbidenExist != undefined){
                return new RuleError(`代名詞漢字書き: ${forbbidenExist["forbidden_form"]}`, {
                    index: token.word_position - 1,
                    fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], forbbidenExist["preferred_form"])
                });
            }
        };
        if (matchPattern副詞漢字書き(token) == true) {
            var forbbidenExist = findForbidden(token.surface_form, ADVERB_TABLE);
            if(forbbidenExist != undefined){
                return new RuleError(`副詞漢字書き: ${forbbidenExist["forbidden_form"]}`, {
                    index: token.word_position - 1,
                    fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], forbbidenExist["preferred_form"])
                });
            }
        };
        if (matchPattern接続詞かな書き(token) == true) {
            var kanjiFlag = isContainsKanji(token.surface_form)
            if(kanjiFlag == true){
                return new RuleError(`接続詞かな書き: ${token.surface_form}`, {
                    index: token.word_position - 1,
                    fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], convertKanaToHira(token.reading))
                });
            }
        };
        if (matchPattern名詞送り仮名(token) == true) {
            var forbbidenExist = findForbidden(token.surface_form, NOUN_TABLE);
            if(forbbidenExist != undefined){
                return new RuleError(`名詞送り仮名: ${forbbidenExist["forbidden_form"]}`, {
                    index: token.word_position - 1,
                    fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], forbbidenExist["preferred_form"])
                });
            }
        };
    };
}