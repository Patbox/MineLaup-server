<template>
  <li
    class="relative"
    @mouseenter="showTitle = true"
    @mouseleave="showTitle = false"
  >
    <nuxt-link
      tag="span"
      class="text-white w-12 h-10 flex hover:text-green-400 cursor-pointer border-l-2 border-transparent"
      :to="to"
      active-class="border-green-400 text-green-400"
    >
      <span class="m-auto text-xl">
        <i class="fas" :class="'fa-' + icon"></i>
      </span>
    </nuxt-link>
    <span
      v-if="showTitle"
      class="absolute bg-gray-800 px-1 rounded top-0 left-0 mt-2 ml-12 whitespace-no-wrap"
    >
      {{ name }}
    </span>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class TSideBarButton extends Vue {
  @Prop({ required: true })
  name!: string

  @Prop({ required: true })
  icon!: string

  @Prop({ required: true })
  to!: string

  @Prop()
  exact!: boolean

  showTitle: boolean = false
}
</script>
