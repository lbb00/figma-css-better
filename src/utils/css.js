import { toast } from '../components/Toast/index.js'
import postcss from 'postcss'
import postcssPxToViewport from 'postcss-px-to-viewport'
import postcssDiscardComments from 'postcss-discard-comments'
import {
  PX_TO_VIEWPORT_CONFIG_KEY,
  FILTER_CONFIG_KEY
} from '../constant/storage'
import {
  pxToViewportConfigDefault,
  filterConfigDefault
} from '../constant/config'

export async function getCSS (el) {
  const cssHtml = '{' + el.parentElement.innerText + '}'

  const content = await postcss([
    postcssPxToViewport(
      GM_getValue(PX_TO_VIEWPORT_CONFIG_KEY, pxToViewportConfigDefault)
    ),
    postcssDiscardComments({})
  ]).process(cssHtml)

  const filters = GM_getValue(FILTER_CONFIG_KEY, filterConfigDefault)
  const styleArray = content.css
    .replace(/(^\{)|(\}$)/g, '')
    .split('\n')
    .filter((raw) => {
      return (
        !!raw && filters.findIndex((rule) => new RegExp(rule).test(raw)) > -1
      )
    })

  await navigator.clipboard.writeText(styleArray.join('\n'))
  toast({
    title: '复制成功'
  })
}
