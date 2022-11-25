# textlint-rule-ja-conjunction-kanagaki

Rule of conjunctive particle 'Kanagaki' writing style for Japanese.

## Install
```
# Necessary dependancies
npm install --save-dev kuromojin

# Install this package
npm install --save-dev https://github.com/er-ri/textlint-rule-ja-conjunction-kanagaki/tarball/v1.0.1
```

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "ja-conjunction-kanagaki": true
    }
}
```

Via CLI

```
textlint --rule ja-conjunction-kanagaki README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

MIT © er-ri

## Reference
* [Enable Debug in VS Code](https://someiyoshino.info/entry/2022/07/30/185845)
