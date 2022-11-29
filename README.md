# textlint-rule-personal-original

Textlint rule for personal use.

## Install
```
# Necessary dependancies
npm install --save-dev kuromojin

# Install this package
npm install --save-dev https://github.com/er-ri/textlint-rule-personal-original/tarball/v1.0.1
```

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "personal-original": true
    }
}
```

Via CLI

```
textlint --rule personal-original" README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## Note
* The key `main` in `package.json` is used for searching rule entry point, modify the value when renaming rule name.

## License

MIT © er-ri

## Reference
* [Enable Debug in VS Code](https://someiyoshino.info/entry/2022/07/30/185845)
