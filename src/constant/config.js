export const pxToViewportConfigDefault = {
  unitToConvert: 'px',
  viewportWidth: 50,
  viewportHeight: 1334,
  unitPrecision: 3,
  viewportUnit: 'rpx',
  fontViewportUnit: 'rpx',
  selectorBlackList: ['.ignore'],
  minPixelValue: 1,
  mediaQuery: false
}

export const filterConfigDefault = [
  'width',
  'height',
  'border',
  'border-radius',
  'font-size: ?(?!normal).*',
  'font-weight: ?(?!normal).*',
  'word-spacing',
  'line-height',
  'color',
  'opacity',
  'background',
  'background-image',
  'box-shadow'
]
