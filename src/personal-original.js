import { tokenize } from "kuromojin";
import { split, Syntax } from "sentence-splitter";
import singleTokenRule from "./rules/rule-define"
const { PHRASE_TABLE } = require('./rules/phrase-table');

const reporter = (context, options = {}) => {
    const { Syntax, getSource, RuleError, report, fixer, locator } = context;

    // Only the first rule in `rule-define.js` is required, the other rules will be executed automatically.
    const ruleかな漢字書き = singleTokenRule(context);

    return {
        [Syntax.Paragraph](node) {
            const text = getSource(node);

            // Check paragraph length.
            // if(text.length > 120){
            //     return new RuleError(`1段落長さが120文字超えている: ${text.slice(0, 10) + '...'}`);
            // }

            // Check every sentences length.
            var sentences = split(text);
            sentences.forEach(sentence => {
                if(sentence.type === "Sentence" && sentence.raw.length > 40){
                    const ruleError = new RuleError(`1文長さが40文字超えている: ${sentence.raw.slice(0, 10) + '...'}`, {
                        start: sentence.loc.start
                    });
                    report(node, ruleError); 
                }

                // Replace forbidden phrases for the every sentences using Regular Expression.
                for(var i = 0; i < PHRASE_TABLE.length; i++){
                    var phrase = PHRASE_TABLE[i]['forbidden_phrase'];
                    var phrase_regex = PHRASE_TABLE[i]['forbidden_regex'];
                    var re = new RegExp(phrase_regex, 'ig');
    
                    for (let match of sentence.raw.matchAll(re)) {
                        if (match) {
                            report(
                                node,
                                new RuleError(`${PHRASE_TABLE[i]['warning_message']}: ${phrase}`, {
                                    padding: locator.range([match.index, match.index + phrase.length]),
                                    fix: fixer.replaceTextRange([match.index, match.index + phrase.length], PHRASE_TABLE[i]['preferred_phrase'])
                                })
                            );
                        }
                    }
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
                    pushError(ruleかな漢字書き(token));
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