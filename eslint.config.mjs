import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	{
		rules: {
			complexity: ['error', 20],
			'max-depth': ['error', 4],
			'max-nested-callbacks': ['error', 4],
			'max-len': ['error', 150],
			'max-lines': ['error', 700],
			'max-lines-per-function': ['error', 134],
			'no-empty': ['error', { allowEmptyCatch: true }],
			'no-console': ['error'],
			'no-trailing-spaces': ['error'],
			'no-unused-vars': 'error',
			'no-undef': 'error',
			indent: ['error', 'tab'],
			'comma-dangle': ['error', {
				'arrays': 'always-multiline',
				'objects': 'always-multiline',
				'imports': 'always-multiline',
				'exports': 'always-multiline',
				'functions': 'always-multiline',
			}],
			quotes: ['error', 'single']
		},
	},
]
