<script>
  import SettingPopup from './SettingPopup.svelte'
  let settingPopup
  function openSetting() {
    settingPopup.open()
  }
</script>

<button on:click={openSetting}>设置</button>
<SettingPopup bind:this={settingPopup} />

<style>
</style>
