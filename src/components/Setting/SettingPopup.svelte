<script>
  import { PX_TO_VIEWPORT_CONFIG_KEY, FILTER_CONFIG_KEY } from '../../constant/storage'
  import { pxToViewportConfigDefault, filterConfigDefault } from '../../constant/config'
  import getStorage from '../../utils/getStorage'

  let visiable = false

  let pxToViewportConfig
  let filterConfig

  export function open() {
    pxToViewportConfig = JSON.stringify(getStorage(PX_TO_VIEWPORT_CONFIG_KEY, pxToViewportConfigDefault))
    filterConfig = JSON.stringify(getStorage(FILTER_CONFIG_KEY, filterConfigDefault))
    visiable = true
  }
  export function close() {
    visiable = false
  }

  function save() {
    localStorage.setItem(PX_TO_VIEWPORT_CONFIG_KEY, JSON.stringify(pxToViewportConfig))
    localStorage.setItem(FILTER_CONFIG_KEY, JSON.stringify(filterConfig))
  }
</script>

<div class="fcb-setting-popup {visiable ? '' : 'fcb-setting-popup--hide'}">
  <span class="fcb-setting-popup__close" on:click={close}>关闭</span>

  <div>
    <div>px-to-viewport 配置</div>
    <textarea class="fcb-setting-textarea" bind:value={pxToViewportConfig} />
  </div>

  <div>
    <div>filter rule 配置</div>
    <textarea class="fcb-setting-textarea" bind:value={filterConfig} />
  </div>
  <button on:click={save}>保存</button>
</div>

<style>
  .fcb-setting-popup {
    position: fixed;
    left: 50%;
    right: 50%;
    width: 500px;
    height: 600px;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    background: #fff;
    border: 1px solid #eee;
    z-index: 9999999;
    box-sizing: border-box;
    padding: 20px 30px;
  }
  .fcb-setting-popup--hide {
    z-index: -1;
    visibility: hidden;
  }
  .fcb-setting-popup__close {
    position: absolute;
    right: 0;
    top: 0;
  }
  .fcb-setting-textarea {
    width: 100%;
    height: 200px;
    background: #f4f4f4;
  }
</style>
