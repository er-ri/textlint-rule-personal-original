import { tokenize } from "kuromojin";
import 又はかな書き from "./rules/rule-define"
import 若しくはかな書き from "./rules/rule-define"
import 打ち合わせ送り仮名 from "./rules/rule-define"

 export default function (context) {
    const { Syntax, getSource, RuleError, report, locator } = context;

    const rule又はかな書き = 又はかな書き(context);
    const rule若しくはかな書き = 若しくはかな書き(context);
    const rule打ち合わせ送り仮名 = 打ち合わせ送り仮名(context);

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
                    pushError(rule又はかな書き(token));
                    pushError(rule若しくはかな書き(token));
                    pushError(rule打ち合わせ送り仮名(token));
                });
            }).then(()=> {
                results.forEach(error => {
                    report(node, error);
                })
            });
        }  
    };
}