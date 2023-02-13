import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import banner from 'vite-plugin-banner'

const version = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version

function genBannerStr() {
  const items = [
    ['name', 'Figma CSS Better'],
    ['namespace', 'https://github.com/lbb00'],
    ['version', version],
    ['description', 'Figma CSS 转为微信小程序样式,rpx,figma,微信,小程序'],
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
    ['grant', 'GM_getValue'],
    ['grant', 'GM_setValue'],
    ['grant', 'GM_deleteValue'],
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
              [...new Array(maxLabelLen - label.length)].map(() => ' ').join('')
            : label
        } ${content}\n`
      )
    }, '') +
    '// ==/UserScript==\n'
  )
}

export default defineConfig({
  root: '.',
  mode: 'production',
  build: {
    target: 'esnext',
    outDir: './',
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      formats: ['es'],
      fileName: 'figma-css-better.user',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.LANG': JSON.stringify('cn'),
  },
  plugins: [
    svelte({
      emitCss: false,
    }),
    banner({
      outDir: './',
      verify: false,
      content: genBannerStr(),
    }),
  ],
})
