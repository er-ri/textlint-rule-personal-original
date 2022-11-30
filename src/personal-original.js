import { tokenize } from "kuromojin";
import 接続詞かな書き from "./rules/rule-define"

const reporter = (context, options = {}) => {
    const { Syntax, getSource, RuleError, report, fixer, locator } = context;

    const rule接続詞かな書き = 接続詞かな書き(context);

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
                    pushError(rule接続詞かな書き(token));
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