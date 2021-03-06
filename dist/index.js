'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint import/no-commonjs: 'off' */

var _rules = require('./rules');

module.exports = {

  // https://github.com/babel/babel-eslint
  parser: 'babel-eslint',

  // http://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    node: true,
    es6: true
  },

  plugins: ['babel', 'flowtype', 'import', 'react'],

  // http://eslint.org/docs/user-guide/configuring#specifying-parser-options
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      experimentalObjectRestSpread: true
    }
  },

  settings: {

    // When true, only checks files with a @flow annotation in the first comment.
    // https://github.com/gajus/eslint-plugin-flowtype#eslint-plugin-flowtype-settings-onlyfileswithflowannotation
    flowtype: { onlyFilesWithFlowAnnotation: false },

    // A whitelist of file extensions that will be parsed as modules and inspected for exports.
    // https://github.com/benmosher/eslint-plugin-import#importextensions
    'import/extensions': ['.js', '.jsx'],

    // A list of regex strings that, if matched by a path, will not report the matching module
    // if no exports are found.
    // https://github.com/benmosher/eslint-plugin-import#importignore
    'import/ignore': ['node_modules'],

    // An array of additional modules to consider as "core" modules--modules that should be
    // considered resolved but have no path on the filesystem.
    // https://github.com/benmosher/eslint-plugin-import#importcore-modules
    'import/core-modules': [],

    // An array of folders. Resolved modules only from those folders will be considered as "external".
    // By default - ["node_modules"].
    // https://github.com/benmosher/eslint-plugin-import/blob/master/README.md#importexternal-module-folders
    'import/external-module-folders': ['node_modules'],

    // https://github.com/benmosher/eslint-plugin-import#resolvers
    'import/resolver': _extends({

      // https://github.com/benmosher/eslint-plugin-import/blob/master/resolvers/node/README.md
      node: {
        extensions: ['.js', '.jsx']
      }

    }, function checkWebpackResolver() {
      try {
        // eslint-disable-next-line
        require.resolve('eslint-import-resolver-webpack');

        return { webpack: { config: 'webpack.config.js' } };
      } catch (ignoreRequireWebpackResolverError) {
        return {};
      }
    }()),

    'import/docstyle': ['jsdoc', 'tomdoc'],

    react: {
      pragma: 'React',
      version: '0.14.8'
    }
  },

  rules: _extends({}, _rules.base, _rules.babel, _rules.flow, _rules.react, _rules.imports)
};