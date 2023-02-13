import { writable } from 'svelte/store'
import { loadConfig } from '../utils/loadConfig.js'
import { INNER_CONFIG } from '../constant/config.js'

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
