<template>
  <nuxt-link
    :to="to"
    class="p-2 pl-4 cursor-pointer transition ease-out duration-100 hover:bg-gray-200 dark-hover:bg-gray-800"
    tag="div"
    :active-class="
      exact
        ? ''
        : 'bg-green-400 text-white hover:bg-green-400 dark-hover:bg-green-400'
    "
    :exact-active-class="
      exact
        ? 'bg-green-400 text-white hover:bg-green-400 dark-hover:bg-green-400'
        : ''
    "
  >
    <slot></slot>
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class TSideBarItem extends Vue {
  @Prop({ required: true })
  to!: string

  @Prop({ default: false, type: Boolean })
  exact!: boolean
}
</script>
