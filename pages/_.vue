<template>
  <div class="container">
    <div>
      <span class="text-6xl text-gray-500">
        <i class="fas fa-map-signs"></i>
      </span>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-400">
        {{ $t('pages.not_found.title') }}
      </h1>
      <a
        class="cursor-pointer hover:text-green-400 transition-colors ease-out duration-150"
        @click="$router.back()"
      >
        {{ $t('pages.not_found.link') }}
      </a>
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
