<script>
  export let value = {}
  export let disabled = false

  function onInput(e) {
    value = JSON.parse(e.target.value)
  }
</script>

<textarea
  class="fcb-setting-textarea"
  value={JSON.stringify(value, null, 2)}
  on:input={onInput}
  {disabled}
/>

<style>
  .fcb-setting-textarea {
    margin-top: 10px;
    width: 100%;
    height: 400px;
    outline: none;
    border-radius: 6px;
    padding: 8px 6px;
    background: #f8f8f8;
  }
</style>
