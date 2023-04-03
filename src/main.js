import { debounce } from 'lodash-es'
import Actions from './components/Actions.svelte'
import SettingPanel from './components/SettingPanel.svelte'
import { toast } from './components/Toast/index'
import {
  PX_TO_VIEWPORT_CONFIG_KEY,
  FILTER_CONFIG_KEY,
  REPLACE_CONFIG_KEY,
  CONFIG_URL,
} from './constant/storage'
import { FIGMA_MENU_QUERY, FIGMA_CSS_CODE_QUERY } from './constant/figma'

const installFigmaPlugin = debounce(function (el) {
  const btnEl = el.querySelector('#fcb-copy-button')
  const codeEl = el.querySelector(FIGMA_CSS_CODE_QUERY)
  if (!btnEl && codeEl) {
    const targetEl = document.createElement('div')
    codeEl.parentElement.prepend(targetEl)
    // eslint-disable-next-line no-new
    new Actions({
      target: targetEl,
    })
  }
}, 500)

function checkFigma() {
  const oldLog = unsafeWindow.console.log
  unsafeWindow.console.log = function (...args) {
    if (/\[Fullscreen\] loadtime/gi.test(args[0])) {
      setTimeout(() => {
        const el = document.querySelector(FIGMA_MENU_QUERY)
        if (el) {
          installFigmaPlugin(el)
          el.addEventListener(
            'DOMSubtreeModified',
            installFigmaPlugin.bind(null, el),
            false
          )
        } else {
          toast({
            title: 'FigmaCssBetter 初始化失败',
            duration: 5000,
          })
        }
      }, 1000)
    }
    oldLog(...args)
  }
}

function checkSetting() {
  if (
    /^https:\/\/lbb00.github.io\/figma-css-better\/setting/.test(
      window.location.href
    )
  ) {
    const mainEl = document.querySelector('main')

    // eslint-disable-next-line no-new
    new SettingPanel({
      target: mainEl,
    })
  }
}

function loadConfig() {
  const configUrl = GM_getValue(CONFIG_URL, '')
  if (configUrl) {
    GM_xmlhttpRequest({
      url: configUrl,
      method: 'get',
      onload(xhr) {
        if (+xhr.status !== 200) {
          toast({ title: '配置加载失败' })
          return
        }
        const { pxToViewport, filter, replace } = JSON.parse(xhr.response)
        GM_setValue(PX_TO_VIEWPORT_CONFIG_KEY, pxToViewport)
        GM_setValue(FILTER_CONFIG_KEY, filter)
        GM_setValue(REPLACE_CONFIG_KEY, replace)
      },
      onerror(e) {
        toast({ title: '配置加载失败' + e.message })
      },
    })
  }
}

function main() {
  loadConfig()
  checkFigma()
  checkSetting()
}
main()
