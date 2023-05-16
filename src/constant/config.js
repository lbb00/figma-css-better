export const innerConfigIds = ['inner', 'inner-tailwind']

export const INIT_CONFIG_OPTIONS = {
  pxToViewport: null,
  filter: [
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
    'box-shadow',
  ],
  replace: [],
  textWithoutBoxSize: true,
  autoHeight: true,
  tailwind: false,
}

export const INNER_CONFIG = {
  id: 'inner',
  name: '内置配置(小程序)',
  url: '',
  options: {
    ...structuredClone(INIT_CONFIG_OPTIONS),
    pxToViewport: {
      unitToConvert: 'px',
      viewportWidth: 50,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'rpx',
      fontViewportUnit: 'rpx',
      selectorBlackList: ['.ignore'],
      minPixelValue: 1,
      mediaQuery: false,
    },
    filter: [
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
      'box-shadow',
    ],
  },
}

export const INNER_CONFIG_TAILWIND = {
  id: 'inner-tailwind',
  name: '内置配置(Tailwind)',
  options: {
    ...structuredClone(INIT_CONFIG_OPTIONS),
    tailwind: true,
  },
}
