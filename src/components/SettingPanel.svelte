<script>
  import { nanoid } from 'nanoid'
  import { NativeSelect, Button, TextInput, Group } from '@svelteuidev/core'
  import JsonEditor from './JSONEditor.svelte'
  import {
    INIT_CONFIG_OPTIONS,
    INNER_CONFIG,
    INNER_CONFIG_TAILWIND,
    innerConfigIds,
  } from '../constant/config'
  import { toast } from './Toast/index'
  import { appStore } from '../store/app'
  import { loadConfig } from '../utils/loadConfig'

  /**
   * config 结构
   * {url,name,options}
   */
  let configList = [
    INNER_CONFIG,
    INNER_CONFIG_TAILWIND,
    ...GM_getValue('CONFIG_LIST', []),
  ]
  $: configSelectData = configList.map((config) => {
    return {
      label: config.name,
      value: config.id,
    }
  })
  let currentConfigId = $appStore.usedConfigId
  $: currentConfig = structuredClone(
    configList.find((config) => config.id === currentConfigId)
  )

  let configData
  $: if (currentConfig) {
    syncConfigData()
  }

  // 避免死循环，不知道有没有啥更好的办法
  let loadUrl = undefined
  $: if (configData.url && configData.url !== loadUrl) {
    loadConfigData()
  }
  $: if (!configData.url) {
    loadUrl = undefined
  }

  function syncConfigData() {
    configData = structuredClone(currentConfig)
  }

  async function loadConfigData() {
    loadUrl = configData.url
    const options = await loadConfig(configData.url)
    configData.options = options
  }

  $: isInnerConfig = innerConfigIds.includes(currentConfigId)

  function deleteConfig() {
    configList = configList.filter((config) => config.id !== currentConfigId)
    currentConfigId = configList[0].id
    cacheLocalConfig()
  }

  function addConfig() {
    const id = nanoid()
    configList = [
      ...configList,
      {
        id,
        name: 'new config - ' + Date.now(),
        url: '',
        options: structuredClone(INIT_CONFIG_OPTIONS),
      },
    ]
    currentConfigId = id
  }

  function cacheLocalConfig() {
    const newList = configList
      .filter((i) => !innerConfigIds.includes(i.id))
      .map((i) => {
        if (i.id === currentConfigId) {
          if (configData.url) {
            return {
              ...configData,
              options: {},
            }
          }
          return configData
        }
        return i
      })
    GM_setValue('CONFIG_LIST', newList)
    configList = [INNER_CONFIG, ...newList]
  }

  function saveConfig() {
    cacheLocalConfig()
    toast({
      title: '保存成功',
    })
  }
</script>

<div class="fcb-setting">
  <div>
    <NativeSelect
      label="切换配置"
      data={configSelectData}
      bind:value={currentConfigId}
    />
    <Button on:click={addConfig}>添加配置</Button>
  </div>
  {#if currentConfig}
    <div>
      <h2>配置</h2>
      {#if configData}
        <TextInput label="id" bind:value={configData.id} disabled={true} />
        <TextInput
          label="url"
          bind:value={configData.url}
          disabled={isInnerConfig}
        />
        <TextInput
          label="name"
          bind:value={configData.name}
          disabled={isInnerConfig}
        />
        <JsonEditor
          bind:value={configData.options}
          disabled={configData.url || isInnerConfig}
        />
      {/if}
    </div>
    {#if !isInnerConfig}
      <Group position="right">
        <Button on:click={deleteConfig} color="red">删除配置</Button>
        <Button on:click={saveConfig} color="green">保存</Button>
      </Group>
    {/if}
  {/if}
</div>

<style>
  :root {
    color: #333;
  }
  h2 {
    margin-top: 20px;
  }

  .config-addr-input {
    margin-top: 10px;
    display: block;
    width: 100%;
    height: 30px;
    border-radius: 6px;
    padding: 8px 6px;
    outline: none;
    background: #f8f8f8;
  }
</style>
