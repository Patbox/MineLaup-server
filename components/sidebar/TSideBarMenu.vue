<template>
  <div class="border-r w-64">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class TSideBarMenu extends Vue {}
</script>
