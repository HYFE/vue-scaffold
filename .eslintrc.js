module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    env: {
        'browser': true,
        'node': true
    },
    globals: {
        '_': true
    },
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        //
        'space-before-function-paren': [0, "always"],
        "keyword-spacing": 0,
        // 4 space indent
        'indent': [2, 4, { "SwitchCase": 1 }],
        // disable no-new
        'no-new': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
