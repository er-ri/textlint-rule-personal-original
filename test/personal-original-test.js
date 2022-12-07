import TextLintTester from "textlint-tester";
import rule from "../src/personal-original";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("日本語チェック", rule, {
    invalid: [
        // single match
        {
            text: `todo:アルゴリズム     メッセージ`,
            errors: [
                {
                    message: "Customized message1: アルゴリズム"
                },
                {
                    message: "Customized message2: メッセージ"
                }
            ]
        },
        // single match
        {
            text: `本田のコメントを掲載本田のコメントを掲載本田のコメントを掲載本田のコメントを掲載本田のコメントを掲載本田のコメントを掲載。`,
            errors: [
                {
                    message: "1文長さが40文字超えている: 本田のコメントを掲載..."
                }
            ]
        },
        // single match
        {
            text: "わたしはいいです。",
            errors: [
                {
                    message: "代名詞漢字書き: わたし"
                }
            ]
        },
        // single match
        {
            text: "さらにいいです。",
            errors: [
                {
                    message: "副詞漢字書き: さらに"
                }
            ]
        },
        // single match
        {
            text: "追って追記します。",
            errors: [
                {
                    message: "接続詞かな書き: 追って"
                }
            ]
        },
        // single match
        {
            text: "従って、最初は。",
            errors: [
                {
                    message: "接続詞かな書き: 従って"
                }
            ]
        },
        // single match
        {
            text: "受け付けはそちらです。",
            errors: [
                {
                    message: "名詞送り仮名: 受け付け"
                }
            ]
        },
        // single match
        {
            text: "打ち合わせを設定します。",
            errors: [
                {
                    message: "名詞送り仮名: 打ち合わせ"
                }
            ]
        },
    ]
});
