<script>
  import { PX_TO_VIEWPORT_CONFIG_KEY, FILTER_CONFIG_KEY } from '../../constant/storage'
  import { pxToViewportConfigDefault, filterConfigDefault } from '../../constant/config'
  import { toast } from '../Toast/index'

  let pxToViewportConfig = JSON.stringify(GM_getValue(PX_TO_VIEWPORT_CONFIG_KEY, pxToViewportConfigDefault))
  let filterConfig = JSON.stringify(GM_getValue(FILTER_CONFIG_KEY, filterConfigDefault))

  function save () {
    try {
      GM_setValue(PX_TO_VIEWPORT_CONFIG_KEY, JSON.parse(pxToViewportConfig))
      GM_setValue(FILTER_CONFIG_KEY, JSON.parse(filterConfig))
      toast({
        title: '保存成功'
      })
    } catch (e) {
      toast({
        title: e.message
      })
    }
  }
</script>

<div class="fcb-setting">
  <div>
    <h2>px-to-viewport 配置</h2>
    <textarea class="fcb-setting-textarea" bind:value={pxToViewportConfig} />
  </div>

  <div>
    <h2>filter rule 配置</h2>
    <textarea class="fcb-setting-textarea" bind:value={filterConfig} />
  </div>
  <button on:click={save}>保存</button>
</div>

<style>
  .fcb-setting-textarea {
    width: 100%;
    height: 200px;
    background: #f4f4f4;
  }
</style>
