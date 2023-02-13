<script>
  import CopyButton from './CopyButton.svelte'
  import SettingButton from './SettingButton.svelte'
  import ConfigSelect from './ConfigSelect.svelte'
  export let codeEl
</script>

<CopyButton {codeEl} />
<SettingButton />
<ConfigSelect />
