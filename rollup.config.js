import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

const libName = 'duDatepicker',
    outputJs = `${libName}.js`

let plugins = [
    resolve(),
    babel({ babelHelpers: 'bundled' })
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