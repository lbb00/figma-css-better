<script>
  import { debounce } from 'lodash-es'
  import { getCSS } from '../../utils/css'
  export let codeEl
  const copy = debounce(() => {
    getCSS(codeEl)
  }, 500)
</script>

<button id="fcb-copy-button" class="fcb-copy-button" on:click={copy}>🔥复制小程序样式</button>

<style>
  .fcb-copy-button {
    padding: 4px 8px;
    border-radius: 4px;
    background: #05bea9;
    outline: none;
    color: #fff;
    cursor: point;
    margin-bottom: 10px;
  }
</style>
