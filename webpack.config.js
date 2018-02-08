const path = require('path');
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './dist';
    const clientBundleConfig = {
        stats: { modules: false },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            filename: '[name].js',
            publicPath: 'dist/', // Webpack dev middleware, if enabled, handles requests for this URL prefix
            path: path.join(__dirname, clientBundleOutputDir),
        },
        module: {
            rules: [
                { test: /\.ts$/, include: /src/, use: 'awesome-typescript-loader?silent=true' }
            ]
        },
        entry: { 'index': './src/Rangee.ts' },
        plugins: [
            new CheckerPlugin()
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin()
            ])
    };

    return clientBundleConfig
};