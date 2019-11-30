module.exports = {
  extends: ['react-app', 'plugin:import/errors', 'plugin:import/warnings'
  ],
  plugins: ['react-hooks', 'prettier', 'import'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'react/style-prop-object': 0,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['style.js'
      ],
      rules: {
        'no-unused-vars': 'off',
      },
    },
    {
      files: ['package-lock.json', 'src/locales/*.json', 'src/config/config.json', 'src/config/StyledThemes/*.json'],
      rules: {
        'prettier/prettier': 'off', //prettier screams error for the i18n files
        'i18n-json/sorted-keys': [
          2,
          {
            order: 'asc',
            indentSpaces: 2,
          },
        ], //sort i18n in asc order
      },
    },
  ],
};