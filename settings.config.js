module.exports = {
    browsersTarget: ["last 2 versions"], // Browserlist avaliable here : https://github.com/ai/browserslist
    port: 3000,
    https: false,
    sourceMap: true,
    shared: true,
    inline: true,
    proxy: {
        '/api': {
            target: 'https://other-server.example.com',
            secure: false
        }
    }
}