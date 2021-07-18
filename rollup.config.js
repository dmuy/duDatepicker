import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

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
        banner: "/*!Don't remove this!\n * duDatePicker v2.0 plugin (Vanilla JS)\n * https://github.com/dmuy/duDatepicker\n *\n * Author: Dionlee Uy\n * Email: dionleeuy@gmail.com\n */"
    },
    plugins: plugins
}