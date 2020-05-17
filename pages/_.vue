<template>
  <div class="container">
    <div>
      <span class="text-6xl text-gray-500">
        <i class="fas fa-map-signs"></i>
      </span>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-400">
        {{ $t('pages.not_found') }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Fallback extends Vue {
  layout() {
    return 'side-bar'
  }
}
</script>
