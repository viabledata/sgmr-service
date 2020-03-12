module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "extends": "airbnb/base",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "array-callback-return": "off",
    "arrow-body-style": "off",
    "consistent-return": "off",
    "func-names": ["error", "never"],
    "max-len": ["error", { "code": 185 }],
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "no-restricted-globals": "off",
    "no-restricted-syntax": "off",
    "no-unused-expressions": "off",
    "import/no-unresolved": "off",
    "no-unused-vars": "off",
    "prefer-const": "off",
    "prefer-destructuring": "off"
  }
};
