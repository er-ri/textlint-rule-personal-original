// LICENSE : MIT
"use strict";
/*
    (f) 接続詞かな書き
*/
import matchTokenStream from "./../matchTokenStream";
export default function (context) {
    const {RuleError} = context;

    const matchPattern又はかな書き = matchTokenStream([
        {
            "pos": "接続詞",
            "surface_form": "又は"
        }
    ]);

    const matchPattern若しくはかな書き = matchTokenStream([
        {
            "pos": "接続詞",
            "surface_form": "若しくは"
        }
    ]);

    const matchPattern打ち合わせ送り仮名 = matchTokenStream([
        {
            "pos": "名詞",
            "surface_form": "打ち合わせ"
        }
    ]);

    return (token) => {
        if (matchPattern又はかな書き(token)) {
            return new RuleError("接続詞かな書き: 又は", {
                index: token.word_position - 1
            });
        }
        if (matchPattern若しくはかな書き(token)) {
            return new RuleError("接続詞かな書き: 若しくは", {
                index: token.word_position - 1
            });
        }
        if (matchPattern打ち合わせ送り仮名(token)) {
            return new RuleError("送り仮名: 打ち合わせ", {
                index: token.word_position - 1
            });
        }
    };
}