import { debounce } from 'lodash-es'
import Actions from './components/Actions/Actions.svelte'

const install = debounce(function (el) {
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

function main () {
  const oldLog = console.log
  window.console.log = function (...args) {
    if (/\[Fullscreen\] loadtime/gi.test(args[0])) {
      setTimeout(() => {
        const el = document.querySelector('[name=propertiesPanelContainer]')
        if (el) {
          install(el)
          el.addEventListener(
            'DOMSubtreeModified',
            install.bind(null, el),
            false
          )
        }
      }, 1000)
    }
    oldLog(...args)
  }
}
main()
