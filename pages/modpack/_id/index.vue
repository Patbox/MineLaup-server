<template>
  <div class="p-4 flex flex-col items-center">
    <p class="mb-4">
      {{ $t('pages.modpack.view.version.title') }}
    </p>
    <t-button
      class="w-1/3"
      icon="plus"
      @click="$router.push('/modpack/' + $route.params.id + '/version/new')"
    >
      {{ $t('pages.modpack.view.version.new') }}
    </t-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TButton from '~/components/form/TButton.vue'

@Component({
  components: {
    TButton,
  },
})
export default class ModpackViewIndex extends Vue {}
</script>
