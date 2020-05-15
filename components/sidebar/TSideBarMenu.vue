<template>
  <div
    class="border-r w-64 dark:border-gray-800 dark:bg-gray-900 dark:text-white"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class TSideBarMenu extends Vue {}
</script>
