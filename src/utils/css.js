import { toast } from '../components/Toast/index.js'
import postcss from 'postcss'
import postcssPxToViewport from 'postcss-px2vp'
import postcssDiscardComments from 'postcss-discard-comments'
import {
  PX_TO_VIEWPORT_CONFIG_KEY,
  FILTER_CONFIG_KEY,
  REPLACE_CONFIG_KEY,
} from '../constant/storage'
import {
  pxToViewportConfigDefault,
  filterConfigDefault,
} from '../constant/config'
import replaceColor from './replaceColor'

export async function getCSS(css) {
  const filters = GM_getValue(FILTER_CONFIG_KEY, filterConfigDefault)
  css = css
    .split('\n')
    .filter((raw) => {
      return (
        !!raw && filters.findIndex((rule) => new RegExp(rule).test(raw)) > -1
      )
    })
    .join('\n')

  const postcssRes = await postcss([
    postcssPxToViewport(
      GM_getValue(PX_TO_VIEWPORT_CONFIG_KEY, pxToViewportConfigDefault)
    ),
    postcssDiscardComments({}),
  ]).process(`{${css}}`)

  css = postcssRes.css.replace(/(^\{)|(\}$)/g, '')

  const { colors, custom } = GM_getValue(REPLACE_CONFIG_KEY, {})

  if (colors) {
    const res = replaceColor(css, colors)
    css = res.content
  }

  if (custom) {
    custom.forEach((i) => {
      const regArr = []
      Array.isArray(i.reg)
        ? i.reg.forEach((s) => regArr.push(new RegExp(s)))
        : regArr.push(new RegExp(i.reg))

      if (regArr.every((r) => r.test(css))) {
        regArr.forEach((reg) => {
          css = css.replace(reg, '')
        })
        css = css + i.new
      }
    })
  }
  await navigator.clipboard.writeText(css.replace(/^\s*\n/gm, ''))
  toast({
    title: '复制成功',
  })
}
