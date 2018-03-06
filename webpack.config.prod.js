const path = require('path');
const webpack = require('webpack');

module.exports = (options) => {
    const config = {
        mode: 'production',
        entry: {
            "demo": './src/demo.ts',
            "index": "./src/Rangee.ts"
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: '[name].min.js',
            path: path.resolve(__dirname, 'dist')
        }
    };

    return config;
}