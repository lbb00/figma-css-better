<script>
  import {
    PX_TO_VIEWPORT_CONFIG_KEY,
    FILTER_CONFIG_KEY,
    REPLACE_CONFIG_KEY,
    CONFIG_URL,
  } from '../../constant/storage'
  import {
    pxToViewportConfigDefault,
    filterConfigDefault,
  } from '../../constant/config'
  import { toast } from '../Toast/index'

  let pxToViewportConfig = JSON.stringify(
    GM_getValue(PX_TO_VIEWPORT_CONFIG_KEY, pxToViewportConfigDefault)
  )
  let filterConfig = JSON.stringify(
    GM_getValue(FILTER_CONFIG_KEY, filterConfigDefault)
  )
  let replaceConfig = JSON.stringify(GM_getValue(REPLACE_CONFIG_KEY, []))
  let configUrl = GM_getValue(CONFIG_URL, '')

  function loadConfig() {
    if (configUrl) {
      GM_xmlhttpRequest({
        url: configUrl,
        method: 'get',
        onload(xhr) {
          if (+xhr.status !== 200) {
            toast({ title: '配置加载失败' })
            return
          }
          const { pxToViewport, filter, replace } = JSON.parse(xhr.response)
          pxToViewportConfig = JSON.stringify(pxToViewport)
          filterConfig = JSON.stringify(filter)
          replaceConfig = JSON.stringify(replace)
        },
        onerror(e) {
          toast({ title: '配置加载失败' + e.message })
        },
      })
    }
  }

  function save() {
    try {
      GM_setValue(PX_TO_VIEWPORT_CONFIG_KEY, JSON.parse(pxToViewportConfig))
      GM_setValue(FILTER_CONFIG_KEY, JSON.parse(filterConfig))
      GM_setValue(REPLACE_CONFIG_KEY, JSON.parse(replaceConfig))
      GM_setValue(CONFIG_URL, configUrl)
      toast({
        title: '保存成功',
      })
    } catch (e) {
      toast({
        title: e.message,
      })
    }
  }

  function confirmRemoteUrl() {
    loadConfig()
  }
</script>

<div class="fcb-setting">
  <div>
    <h2>
      远程加载配置（请配置json文件地址，会覆盖本地配置，插件每次被启动都会更新）
    </h2>
    <input class="config-addr-input" bind:value={configUrl} />
    <button class="config-button" on:click={confirmRemoteUrl}>测试加载</button>
  </div>
  <div>
    <h2>px-to-viewport 配置</h2>
    <textarea
      class="fcb-setting-textarea"
      bind:value={pxToViewportConfig}
      disabled={configUrl}
    />
  </div>
  <div>
    <h2>Filter Rule 配置</h2>
    <textarea
      class="fcb-setting-textarea"
      bind:value={filterConfig}
      disabled={configUrl}
    />
  </div>
  <div>
    <h2>Replace Rule 配置</h2>
    <textarea
      class="fcb-setting-textarea"
      bind:value={replaceConfig}
      disabled={configUrl}
    />
  </div>
  <button class="save-button" on:click={save}>保存</button>
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
  .config-button {
    margin-top: 10px;
    padding: 4px 8px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.16);
    outline: none;
    color: #fff;
  }
  .save-button {
    margin-top: 10px;
    padding: 4px 8px;
    border-radius: 4px;
    background: #05bea9;
    outline: none;
    color: #fff;
  }
  .fcb-setting-textarea {
    margin-top: 10px;
    width: 100%;
    height: 200px;
    outline: none;
    border-radius: 6px;
    padding: 8px 6px;
    background: #f8f8f8;
  }
</style>
