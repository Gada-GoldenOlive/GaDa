module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  // 다른 config를 사용하더라도 prettier를 맨 마지막에 넣어야 모든 중복 규칙을 비활성화 시킬 수 있다.
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-console': 0,
    indent: [1, 2, {SwitchCase: 1}],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 1,
    'react-native/no-color-literals': 1,
    'react-native/no-raw-text': 1,
    'react-native/no-single-element-style-arrays': 2,
    'no-unsafe-optional-chaining': 0,
    'react/prop-types': 0,
    'react/function-component-definition': 0,
    // default export 를 권장
    'import/prefer-default-export': 1,
    // 디폴트 값을 지정한 파라미터는 함수 파라미터들 중 제일 뒤로 가야함
    'default-param-last': 1,
    'react/jsx-props-no-spreading': 1,
    // 선언 전 변수를 사용하는 것을 제한
    'no-use-before-define': [
      1,
      {functions: true, classes: true, variables: true},
    ],
    'no-unused-expressions': [
      'error',
      {allowTernary: true, allowShortCircuit: true},
    ],
    'no-continue': 1,
    'react/no-unstable-nested-components': ['error', {allowAsProps: true}],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
