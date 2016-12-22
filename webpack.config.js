module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        './src/index.js'
    ],
    output: {
        path: __dirname ,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
