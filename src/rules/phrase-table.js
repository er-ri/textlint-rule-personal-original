// LICENSE : MIT
"use strict";

const PHRASE_TABLE = [
    {
        forbidden_phrase: "todo",
        forbidden_regex: "todo",     
        preferred_phrase: "td",
        warning_message: "Customized message"
    },
    {
        forbidden_phrase: "社長",
        forbidden_regex: "(?<!副)社長",     // Negative lookbehind: see https://www.regular-expressions.info/lookaround.html
        preferred_phrase: "SC",
        warning_message: "Customized message"
    },
    {
        forbidden_phrase: "副社長",
        forbidden_regex: "副社長",
        preferred_phrase: "FSC",
        warning_message: "Customized message"
    }
];

exports.PHRASE_TABLE = PHRASE_TABLE