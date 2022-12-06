import { tokenize } from "kuromojin";
import { split, Syntax } from "sentence-splitter";
import 代名詞漢字書き from "./rules/rule-define"

const reporter = (context, options = {}) => {
    const { Syntax, getSource, RuleError, report, fixer, locator } = context;

    // Only the first rule in `rule-define.js` is required, the other rules will be executed automatically.
    const rule代名詞漢字書き = 代名詞漢字書き(context);

    return {
        [Syntax.Paragraph](node) {
            const text = getSource(node);

            // Check paragraph length.
            if(text.length > 120){
                return new RuleError(`1段落長さが120文字超えている: ${text.slice(0, 10) + '...'}`);
            }

            // Check every sentences length.
            var sentences = split(text);
            sentences.forEach(sentence => {
                if(sentence.type === "Sentence" && sentence.raw.length > 40){
                    const ruleError = new RuleError(`1文長さが40文字超えている: ${sentence.raw.slice(0, 10) + '...'}`, {
                        start: sentence.loc.start
                    });
                    report(node, ruleError); 
                }
            });
        },
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