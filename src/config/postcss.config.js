const autoprefixer = require('autoprefixer')
const Config = require('../../settings.config')


const plugin = autoprefixer({
    "browsers": Config.browsersTarget
})

module.exports = {
    plugins: [
        plugin
    ]
}