// ==UserScript==
// @name         Figma CSS Better
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  Figma CSS 转为小程序样式
// @author       lbb00
// @match        https://www.figma.com/file/*
// @icon         https://www.google.com/s2/favicons?domain=figma.com
// @grant        none
// @require      https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js
// @require			 https://cdn.jsdelivr.net/npm/use-singleton/dist/index.min.js
// ==/UserScript==

;(function () {
  'use strict'
  const getToast = UseSingleton.default(() => {
    const el = document.createElement('div')
    el.style.position = 'fixed'
    el.style.zIndex = -1
    el.style.left = '50%'
    el.style.top = '50%'
    el.style.transform = 'translate(-50%,-50%)'
    el.style.visibility = 'hidden'
    el.style.borderRadius = '4px'
    el.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
    el.style.padding = '12px 24px'
    el.style.maxWidth = '200px'
    el.style.color = '#eee'
    el.style.fontSize = '16px'

    let closeTimer = null

    document.body.appendChild(el)

    return ({ text, duration = 1500 }) => {
      el.style.visibility = 'visible'
      el.innerText = text
      el.style.zIndex = '9999999'
      if (closeTimer) {
        clearTimeout(closeTimer)
      }
      closeTimer = setTimeout(() => {
        el.style.zIndex = -1
        el.innerText = ''
        el.style.visibility = 'hidden'
        closeTimer = null
      }, duration)
    }
  })

  const Toast = getToast()

  async function getCSS(el) {
    const cssHtml = el.querySelector('p.hljs-comment')?.parentElement?.innerText
    const props = [
      'width',
      'height',
      'border',
      'border-radius',
      'font-size',
      'font-weight',
      'word-spacing',
      'line-height',
      'color',
      'opacity',
      'background',
      'background-image',
    ]
    const styleArray = cssHtml
      .split('\n')
      .filter((i) => {
        return !!i && props.find((prop) => new RegExp(`^${prop}:`).test(i))
      })
      .map((val) => {
        const matched = val.match(/ -?\d{1,}px/g)
        if (matched) {
          ;[...new Set(matched)].map((i) => {
            const [s, n] = i.match(/(\d*)px/)
            val = val.replace(s, n * 2 + 'rpx')
          })
        }
        return val
      })
    await navigator.clipboard.writeText(styleArray.join('\n'))
    Toast({
      text: '复制成功',
    })
  }

  const install = _.debounce(function (el) {
    let btnEl = el.querySelector('#lbb00-copy')
    let commentEl = el.querySelector('p.hljs-comment')
    if (!btnEl && commentEl) {
      btnEl = document.createElement('button')
      btnEl.innerText = '🔥复制小程序样式'
      btnEl.setAttribute(
        'style',
        'padding: 4px 8px; border-radius: 4px; background:#05BEA9;outline: none;color: #fff;cursor: point;margin-bottom: 10px'
      )
      btnEl.setAttribute('id', 'lbb00-copy')
      btnEl.addEventListener('click', _.debounce(getCSS.bind(null, el)))
      commentEl.parentElement.parentElement.prepend(btnEl)
    }
  }, 500)

  function main() {
    const oldLog = console.log
    window.console.log = function (...args) {
      if (/\[Fullscreen\] loadtime/gi.test(args[0])) {
        setTimeout(() => {
          var el = document.querySelector('[name=propertiesPanelContainer]')
          if (el) {
            install(el)
            el.addEventListener('DOMSubtreeModified', install.bind(null, el), false)
          }
        }, 1000)
      }
      oldLog(...args)
    }
  }
  main()
})()
