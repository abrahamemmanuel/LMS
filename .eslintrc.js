module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "extends": ["airbnb-base", "eslint:recommended", "prettier"],
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error",
        "no-console": "off",
        "no-unused-vars": "warn",
        "func-names": "off",
        "no-process-exit": "off",
        "object-shorthand": "off",
        "class-methods-use-this": "off",
        "no-undef": "off"
    },

};