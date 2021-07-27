<script>
  import CopyButton from '../CopyButton/CopyButton.svelte'
  import SettingButton from '../Setting/SettingButton.svelte'
  export let codeEl
</script>

<CopyButton {codeEl} />
<SettingButton />
