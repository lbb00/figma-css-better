import banner2 from 'rollup-plugin-banner2'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import svelte from 'rollup-plugin-svelte'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import json from '@rollup/plugin-json'

module.exports = {
  input: 'src/main.js',
  output: {
    file: 'figma-css-better.user.js',
    format: 'umd'
  },
  plugins: [
    svelte(),
    postcss({
      extract: false,
      minimize: true
    }),
    json(),
    nodeResolve({
      browser: true
    }),
    commonjs(),
    terser(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.LANG': JSON.stringify('cn')
    }),
    banner2(() => {
      const items = [
        ['name', 'Figma CSS Better'],
        ['namespace', 'http://tampermonkey.net/'],
        ['version', '1.0.0'],
        ['description', 'Figma CSS 转为小程序样式'],
        ['author', 'lbb00'],
        ['match', '*://www.figma.com/file/*'],
        ['icon', 'https://www.google.com/s2/favicons?domain=figma.com'],
        ['grant', 'none']
      ]
      const maxLabelLen = items.reduce(
        (max, [i]) => (max > i.length ? max : i.length),
        0
      )

      return (
        '// ==UserScript==\n' +
        items.reduce((str, [label, content]) => {
          label = label.trim()
          content = content.trim()
          return (
            str +
            `// @${
              label.length < maxLabelLen
                ? label +
                  [...new Array(maxLabelLen - label.length)]
                    .map(() => ' ')
                    .join('')
                : label
            } ${content}\n`
          )
        }, '') +
        '// ==/UserScript==\n'
      )
    })
  ]
}
