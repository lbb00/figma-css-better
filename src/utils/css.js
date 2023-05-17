import postcss from 'postcss'
import postcssPxToViewport from 'postcss-px2vp'
import postcssDiscardComments from 'postcss-discard-comments'

import { appStore } from '../store/app.js'
import { get } from 'svelte/store'
import replaceColor from './replaceColor'
import { toast } from '../components/Toast/index.js'
import { CssToTailwindTranslator } from 'css-to-tailwind-translator'
import { INNER_CONFIG_TAILWIND } from '../constant/config.js'

export async function getCSS(css) {
  const {
    currentConfigData: { options },
  } = get(appStore)
  const filters = options.filter || []
  css = css
    .split('\n')
    .filter((raw) => {
      return (
        !!raw && filters.findIndex((rule) => new RegExp(rule).test(raw)) > -1
      )
    })
    .join('\n')
  if (/font-size/.test(css) && options.textWithoutBoxSize) {
    css = css
      .split('\n')
      .filter((raw) => !/^(width|height)/.test(raw))
      .join('\n')
  }
  const postcssPlugins = []
  if (options.pxToViewport) {
    postcssPlugins.push(postcssPxToViewport(options.pxToViewport))
  }
  postcssPlugins.push(postcssDiscardComments({}))
  const postcssRes = await postcss(postcssPlugins).process(`{${css}}`)

  css = postcssRes.css.replace(/(^\{)|(\}$)/g, '')

  const { colors, custom = [] } = options.replace || {}

  if (colors) {
    const res = replaceColor(css, colors)
    css = res.content
  }

  if (options.autoHeight) {
    custom.push({
      reg: '(^|\\n)height:\\s*(.*);',
      new: '\n/* height: $2; */',
    })
  }

  custom.forEach((i) => {
    if (typeof i.reg === 'string') {
      css = css.replace(new RegExp(i.reg), i.new)
      return
    }
    if (Array.isArray(i.reg)) {
      const regArr = []

      i.reg.forEach((s) => regArr.push(new RegExp(s)))
      if (regArr.every((r) => r.test(css))) {
        regArr.forEach((reg) => {
          css = css.replace(reg, '')
        })
        css = css + i.new
      }
    }
  })
  if (options.tailwind) {
    const {
      data: [{ resultVal }],
    } = CssToTailwindTranslator(`{${css}}`)
    css = resultVal
    if (options.tailwind?.defaultSizeUnitRem === false) {
      css = css.replace(/\[([-+]?\d+(?:\.\d+)?)px\]/g, (_, p1) => p1)
    }
  }
  await navigator.clipboard.writeText(css.replace(/^\s*\n/gm, ''))
  toast({
    title: '复制成功',
  })
}
