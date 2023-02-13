import { writable } from 'svelte/store'
import { loadConfig } from '../utils/loadConfig.js'
import { INNER_CONFIG } from '../constant/config.js'

// 兼容旧的逻辑
console.log('old config url', GM_getValue('__CONFIG_URL'))
if (GM_getValue('__CONFIG_URL')) {
  const configList = GM_getValue('CONFIG_LIST', [])
  if (configList.every((i) => i.id !== 'older')) {
    configList.push({
      id: 'older',
      name: '回响小程序',
      url: GM_getValue('__CONFIG_URL'),
    })
    GM_setValue('CONFIG_LIST', configList)
    GM_setValue('USED_CONFIG_ID', 'older')
  }
  GM_deleteValue('__CONFIG_URL')
}

export const appStore = writable({
  usedConfigId: GM_getValue('USED_CONFIG_ID', 'inner'),
  currentConfigData: {},
})

async function loadNewConfig(id) {
  const configLocal = [INNER_CONFIG, ...GM_getValue('CONFIG_LIST', [])].find(
    (i) => i.id === id
  )

  if (configLocal.url) {
    configLocal.options = await loadConfig(configLocal.url)
  }
  updateCurrentConfigData(configLocal)
}

appStore.subscribe(async (store) => {
  GM_setValue('USED_CONFIG_ID', store.usedConfigId)
  if (store.currentConfigData.id !== store.usedConfigId) {
    loadNewConfig(store.usedConfigId)
  }
})

export function updateUsedConfigId(id) {
  appStore.update((store) => {
    store.usedConfigId = id
    return store
  })
}

export function updateCurrentConfigData(data) {
  appStore.update((store) => {
    store.currentConfigData = data
    return store
  })
}
