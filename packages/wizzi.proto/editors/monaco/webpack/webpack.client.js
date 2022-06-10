const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: 'development',
	entry: {
		app: path.resolve(__dirname, './src/index.tsx'),
		'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
		'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
		'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
		'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
	},
	devServer: {
		hot: true
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.tsx', '.ts']
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'client-build')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|tsx|ts)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
							plugins: [
                                isDevelopment && require.resolve('react-refresh/babel'),
                                "@babel/proposal-class-properties",
                                "@babel/proposal-object-rest-spread"
                            ].filter(Boolean)
						}
					}
				]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				use: ['file-loader']
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname,'src/index.html')
		}),
		isDevelopment && new ReactRefreshWebpackPlugin()
	].filter(Boolean)
};