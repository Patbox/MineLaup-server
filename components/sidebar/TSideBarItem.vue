<template>
  <nuxt-link
    :to="to"
    class="p-2 pl-4 cursor-pointer"
    tag="div"
    :class="{
      'bg-green-400 text-white': isCurrentRoute,
      'hover:bg-gray-200': !isCurrentRoute,
    }"
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

  get isCurrentRoute() {
    if (this.exact) {
      return this.$route.path === this.to
    } else {
      return this.$route.path.startsWith(this.to)
    }
  }
}
</script>
