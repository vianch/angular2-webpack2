const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const METADATA = {
    title: 'Input types example',
    baseUrl: '/',
    isDevServer: true,
    isProd: false,
};

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'main'     : './src/main.ts'
    },
    output: {
        path: path.resolve('www/assets/js'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].chunk.js',
        library: 'ac_[name]',
        libraryTarget: 'var'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [ "node_modules", path.resolve(__dirname, "src")]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: '@angularclass/hmr-loader',
                        options: {
                            pretty: !METADATA.isProd,
                            prod: METADATA.isProd
                        }
                    },
                    { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                        loader: 'ng-router-loader',
                        options: {
                            loader: 'async-import',
                            genDir: 'compiled',
                        }
                    },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: './config/tsconfig.json'
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
                exclude: [ path.resolve(__dirname, "src")]
            },
            {
                test: /\.scss$/,
                use: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: [path.resolve(__dirname, "src")]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: ['/index.html']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            path:  path.resolve('www/assets/js'),
            filename: 'assets.json',
            prettyPrint: true
        }),
        new CheckerPlugin(),
        new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
        new CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: function (module) {
                return (/node_modules/).test(module.resource)
            }
        }),
        new CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'www/../../../index.html',
            title: METADATA.title,
            chunksSortMode: 'dependency',
            metadata: METADATA,
            inject: 'head'
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/images', to: 'www/../../images' }
        ]),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new LoaderOptionsPlugin({})
    ],
    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};