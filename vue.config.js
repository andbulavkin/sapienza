module.exports = {
    devServer: {
        port: 6006,
        disableHostCheck: true,
        public: '0.0.0.0:6006'
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/sapienza/' : '/'
}