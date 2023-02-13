<script>
  import { debounce } from 'lodash-es'
  import { getCSS } from '../utils/css'
  import { toast } from './Toast/index'
  const copy = debounce(() => {
    const codeText = document
      .querySelector('[name=propertiesPanelContainer]')
      ?.querySelector('p.hljs-comment')?.parentElement?.innerText
    if (!codeText) {
      toast('从网页上获取css失败')
      return
    }
    getCSS(codeText)
  }, 500)
</script>

<button id="fcb-copy-button" class="fcb-copy-button" on:click={copy}>
  🔥 复制样式
</button>

<style>
  .fcb-copy-button {
    padding: 4px 8px;
    border-radius: 4px;
    background: #05bea9;
    outline: none;
    color: #fff;
    cursor: pointer;
    margin-bottom: 10px;
    user-select: none;
  }
</style>
