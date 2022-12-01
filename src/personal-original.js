import { tokenize } from "kuromojin";
import 代名詞漢字書き from "./rules/rule-define"
// import 副詞漢字書き from "./rules/rule-define"
// import 接続詞かな書き from "./rules/rule-define"
// import 名詞送り仮名 from "./rules/rule-define"

const reporter = (context, options = {}) => {
    const { Syntax, getSource, RuleError, report, fixer, locator } = context;

    // Only the first rule in `rule-define.js` is required, the following rules will be executed automatically.
    const rule代名詞漢字書き = 代名詞漢字書き(context);
    // const rule副詞漢字書き = 副詞漢字書き(context);
    // const rule接続詞かな書き = 接続詞かな書き(context);
    // const rule名詞送り仮名 = 名詞送り仮名(context);

    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            const results = [];
            const pushError = (error) => {
                if (error) {
                    results.push(error);
                }
            };

            return tokenize(text).then((tokens) => {
                tokens.forEach((token) => {
                    pushError(rule代名詞漢字書き(token));
                    // pushError(rule副詞漢字書き(token));
                    // pushError(rule接続詞かな書き(token));
                    // pushError(rule名詞送り仮名(token));
                });
            }).then(()=> {
                results.forEach(error => {
                    report(node, error);
                })
            });
        }  
    };
}

module.exports = {
    linter: reporter,
    fixer: reporter
};