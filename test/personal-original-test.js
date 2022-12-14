import TextLintTester from "textlint-tester";
import rule from "../src/personal-original";

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("text checker", rule, {
    invalid: [
        {
            text: `    string contains 'todo' with leading spaces.`,
            errors: [
                {
                    message: "Customized message: todo"
                }
            ]
        },
        {
            text: `String contains 'todo'`,
            errors: [
                {
                    message: "Customized message: todo"
                }
            ]
        },
        {
            text: "   さらにいいです。",
            errors: [
                {
                    message: "副詞漢字書き: さらに"
                }
            ]
        },
        {
            // `textlint tester` seems skip the string which contains leading spaces. 
            text: `副社長、社長`,
            errors: [
                {
                    message: "Customized message: 副社長"
                },
                {
                    message: "Customized message: 社長"
                }
            ]
        },
        {
            text: `本田のコメントを掲載本田のコメントを掲載本田のコメントを掲載本田のコメントを掲載本田のコメントを掲載本田のコメントを掲載。`,
            errors: [
                {
                    message: "1文長さが40文字超えている: 本田のコメントを掲載..."
                }
            ]
        },
        {
            text: "わたしはいいです。",
            errors: [
                {
                    message: "代名詞漢字書き: わたし"
                }
            ]
        },
        {
            text: "追って追記します。",
            errors: [
                {
                    message: "接続詞かな書き: 追って"
                }
            ]
        },
        {
            text: "従って、最初は。",
            errors: [
                {
                    message: "接続詞かな書き: 従って"
                }
            ]
        },
        {
            text: "受け付けはそちらです。",
            errors: [
                {
                    message: "名詞送り仮名: 受け付け"
                }
            ]
        },
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
