import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

const pjson = require('./package.json')
const libName = 'duDatepicker',
    outputJs = `${libName}.js`

let plugins = [
    babel({
        exclude: /node_modules/,
        babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs()
]

export default {
    input: `src/${libName}.js`,
    output: {
        file: `dist/${outputJs}`,
        format: 'umd',
        name: libName,
        banner: `/*!Don't remove this!\n * duDatepicker v${pjson.version} plugin (Vanilla JS)\n * ${pjson.homepage}\n *\n * Author: ${pjson.author.name}\n * Email: ${pjson.author.email}\n */`
    },
    plugins: plugins
}