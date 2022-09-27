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
    format: 'iife',
  },
  plugins: [
    svelte(),
    postcss({
      extract: false,
      minimize: true,
    }),
    json(),
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    terser({
      ecma: true,
      warnings: false,
      format: {
        beautify: true,
      },
      mangle: false,
      keep_classnames: true,
      keep_fnames: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.LANG': JSON.stringify('cn'),
    }),
    banner2(() => {
      const items = [
        ['name', 'Figma CSS Better'],
        ['namespace', 'https://github.com/lbb00'],
        ['version', '1.2.4'],
        ['description', 'Figma CSS 转为微信小程序样式,rpx,figma,微信,小程序'],
        ['encoding', 'utf-8'],
        ['author', 'lbb00'],
        ['homepage', 'https://github.com/lbb00/figma-css-better'],
        ['supportURL', 'https://github.com/lbb00/figma-css-better/issues'],
        [
          'updateURL',
          'https://github.com/lbb00/figma-css-better/raw/master/figma-css-better.user.js',
        ],
        [
          'downloadURL',
          'https://github.com/lbb00/figma-css-better/raw/master/figma-css-better.user.js',
        ],
        ['match', '*://www.figma.com/file/*'],
        ['match', 'https://lbb00.github.io/figma-css-better/setting'],
        ['run-at', 'document-end'],
        ['icon', 'https://www.google.com/s2/favicons?domain=figma.com'],
        [
          'license',
          'MIT; https://github.com/lbb00/figma-css-better/blob/main/LICENSE',
        ],
        ['grant', 'unsafeWindow'],
        ['grant', 'window.console'],
        ['grant', 'GM_getValue'],
        ['grant', 'GM_setValue'],
        ['grant', 'GM_xmlhttpRequest'],
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
    }),
  ],
}
