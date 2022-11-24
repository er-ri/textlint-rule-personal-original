import TextLintTester from "textlint-tester";
import rule from "../src/ja-conjunction-kanagaki";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("接続詞かな書きチェック", rule, {
    invalid: [
        // single match
        {
            text: "例二、本人又は代理の者に限る。",
            errors: [
                {
                    message: "接続詞かな書き: 又は",
                    range: [5, 6]
                }
            ]
        },
        // multiple match
        {
            text: `本人又は代理の者に限り、若しくは本人の家族。`,
            errors: [
                {
                    message: "接続詞かな書き: 又は",
                    range: [2, 3]
                },
                {
                    message: "接続詞かな書き: 若しくは",
                    range: [12, 13]
                }
            ]
        },
    
    ],
    valid: [
        // no problem
        {
            text: "本人または代理の者に限る。",
            options: {
                allows: ["OK"]
            }
        }
    ]
});
