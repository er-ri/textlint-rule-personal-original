// LICENSE : MIT
"use strict";
/*
    (f) 接続詞かな書き
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

const CONJUNCTION_TABLE = [
    {
        forbidden_form: "追って",
        preferred_form: "おって"
    },
    {
        forbidden_form: "従って",
        preferred_form: "したがって"
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

function findForbidden(surface_form, formTable){
    for(var i = 0; i < formTable.length; i++){
        if(surface_form == formTable[i]["forbidden_form"]){
            return formTable[i];
        }
    }
    return;
}

export default function (context) {
    const {RuleError, fixer} = context;

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

    const matchPattern名詞送り仮名 = matchTokenStream([
        {
            "pos": "名詞"
        }
    ]);

    return (token) => {
        var forbbidenExist;
        if (matchPattern代名詞漢字書き(token) == true) {
            forbbidenExist = findForbidden(token.surface_form, PRONOUN_TABLE);
            if(forbbidenExist != undefined){
                return new RuleError(`代名詞漢字書き: ${forbbidenExist["forbidden_form"]}`, {
                    index: token.word_position - 1,
                    fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "または")
                });
            }
        };
        if (matchPattern副詞漢字書き(token) == true) {
            forbbidenExist = findForbidden(token.surface_form, ADVERB_TABLE);
            if(forbbidenExist != undefined){
                return new RuleError(`副詞漢字書き: ${forbbidenExist["forbidden_form"]}`, {
                    index: token.word_position - 1,
                    fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "または")
                });
            }
        };
        if (matchPattern接続詞かな書き(token) == true) {
            forbbidenExist = findForbidden(token.surface_form, CONJUNCTION_TABLE);
            if(forbbidenExist != undefined){
                return new RuleError(`接続詞かな書き: ${forbbidenExist["forbidden_form"]}`, {
                    index: token.word_position - 1,
                    fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "または")
                });
            }
        };
        if (matchPattern名詞送り仮名(token) == true) {
            forbbidenExist = findForbidden(token.surface_form, NOUN_TABLE);
            if(forbbidenExist != undefined){
                return new RuleError(`名詞送り仮名: ${forbbidenExist["forbidden_form"]}`, {
                    index: token.word_position - 1,
                    fix: fixer.replaceTextRange([token.word_position - 1, token.word_position - 1 + token.surface_form.length], "または")
                });
            }
        };
    };
}