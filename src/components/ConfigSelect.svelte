<script>
  import { NativeSelect } from '@svelteuidev/core'
  import { appStore } from '../store/app'
  import { INNER_CONFIG, INNER_CONFIG_TAILWIND } from '../constant/config'
  $: configSelectData = [
    INNER_CONFIG,
    INNER_CONFIG_TAILWIND,
    ...GM_getValue('CONFIG_LIST', []),
  ].map((config) => {
    return {
      label: config.name,
      value: config.id,
    }
  })
</script>

<NativeSelect data={configSelectData} bind:value={$appStore.usedConfigId} />
