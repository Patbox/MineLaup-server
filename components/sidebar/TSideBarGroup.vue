<template>
  <div>
    <div class="m-2 text-md text-green-500 uppercase font-bold tracking-wide">
      {{ name }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class TSideBarGroup extends Vue {
  @Prop({ required: true })
  name!: string
}
</script>
