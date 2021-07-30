import { debounce } from 'lodash-es'
import Actions from './components/Actions/Actions.svelte'
import SettingPanel from './components/Setting/SettingPanel.svelte'
import { toast } from './components/Toast/index'

const installFigmaPlugin = debounce(function (el) {
  const btnEl = el.querySelector('#fcb-copy-button')
  const codeEl = el.querySelector('p.hljs-comment')
  if (!btnEl && codeEl) {
    const targetEl = document.createElement('div')
    codeEl.parentElement.parentElement.prepend(targetEl)
    // eslint-disable-next-line no-new
    new Actions({
      target: targetEl
    })
  }
}, 500)

function checkFigma () {
  const oldLog = unsafeWindow.console.log
  unsafeWindow.console.log = function (...args) {
    if (/\[Fullscreen\] loadtime/gi.test(args[0])) {
      setTimeout(() => {
        const el = document.querySelector('[name=propertiesPanelContainer]')
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
            duration: 5000
          })
        }
      }, 1000)
    }
    oldLog(...args)
  }
}

function checkSetting () {
  if (
    /^https:\/\/lbb00.github.io\/figma-css-better\/setting/.test(
      window.location.href
    )
  ) {
    const mainEl = document.querySelector('main')

    // eslint-disable-next-line no-new
    new SettingPanel({
      target: mainEl
    })
  }
}

function main () {
  checkFigma()
  checkSetting()
}
main()
