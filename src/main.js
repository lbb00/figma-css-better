import { debounce } from 'lodash-es'
import Actions from './components/Actions/Actions.svelte'
import SettingPanel from './components/Setting/SettingPanel.svelte'

const installFigmaPlugin = debounce(function (el) {
  const btnEl = el.querySelector('#fcb-copy-button')
  const codeEl = el.querySelector('p.hljs-comment')
  if (!btnEl && codeEl) {
    const targetEl = document.createElement('div')
    codeEl.parentElement.parentElement.prepend(targetEl)

    // eslint-disable-next-line no-new
    new Actions({
      target: targetEl,
      props: { codeEl }
    })
  }
}, 1000)

function checkFigma () {
  const oldLog = console.log
  window.console.log = function (...args) {
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
        }
      }, 1000)
    }
    oldLog(...args)
  }
}

function checkSetting () {
  if (
    /^http:\/\/lbb00.github.io\/figma-css-better\/setting/.test(
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
