import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import fs from 'node:fs'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import banner from 'vite-plugin-banner'
import { visualizer } from 'rollup-plugin-visualizer'

const version = JSON.parse(fs.readFileSync('./package.json', 'utf-8')).version

function genBannerStr(customItems = []) {
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
    ...customItems,
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

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const previewPort = 8087
  if (isDev) {
    const LOCAL_URL = `http://127.0.0.1:${previewPort}/figma-css-better.local.user.js`
    // https://github.com/Tampermonkey/tampermonkey/issues/723
    fs.writeFileSync(
      './figma-css-better.dev.user.js',
      `${genBannerStr()}
      (async function () {
        let isInit = false
        function checkReload() {
          GM.xmlHttpRequest({
            url: '${LOCAL_URL}',
            onload: async (response) => {
              const text = response.responseText
              const storageData = await GM.getValue('DEV_CachedScriptKey', '')
              if (text.length !== storageData.length || text !== storageData) {
                console.log('reload!')
                await GM.setValue('DEV_CachedScriptKey', text)
                window.location.reload()
              } else {
                if(!isInit) {
                  eval(text)
                  isInit = true
                }
                setTimeout(checkReload, 1000)
              }
            },
            onerror: () => {
              setTimeout(checkReload, 1000)
            },
          })
        }
        checkReload()
      })()
      `
    )
  }
  return {
    root: '.',
    esbuild: {
      minifyIdentifiers: false,
      minifyWhitespace: false,
    },
    build: {
      target: 'esnext',
      outDir: './',
      minify: !isDev,
      lib: {
        name: 'FigmaCssBetter',
        entry: resolve(__dirname, 'src/main.js'),
        formats: ['iife'],
        fileName: () => {
          return isDev
            ? 'figma-css-better.local.user.js'
            : 'figma-css-better.user.js'
        },
      },
    },
    preview: {
      port: previewPort,
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.LANG': JSON.stringify('cn'),
    },
    plugins: [
      visualizer(),
      svelte({
        emitCss: false,
      }),
      !isDev &&
        banner({
          outDir: './',
          verify: false,
          content: genBannerStr(),
        }),
    ],
  }
})
