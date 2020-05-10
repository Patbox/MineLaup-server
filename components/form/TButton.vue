<template>
  <button
    class="px-4 py-2 border border-white rounded-full focus:outline-none"
    :class="[
      !disabled ? 'hover:text-' + hoverColor : '',
      {
        'border-gray-600 text-gray-500 cursor-auto': disabled,
        'hover:bg-white hover:text-transparent': !disabled,
      },
    ]"
    :disabled="disabled"
    :type="type"
    @click.prevent="onClick"
  >
    <i
      v-if="icon"
      class="fas w-4 h-4 mr-2"
      :class="[
        !disabled ? 'hover:text-' + hoverColor : '',
        'fa-' + icon,
        {
          'border-gray-600 text-gray-500 cursor-auto': disabled,
          'hover:bg-white hover:text-transparent': !disabled,
        },
      ]"
    ></i>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class Button extends Vue {
  @Prop()
  onClick!: Function

  @Prop({ default: 'gray-800' })
  hoverColor!: String

  @Prop()
  disabled!: boolean

  @Prop()
  icon!: string

  @Prop()
  type!: string
}
</script>

<style lang="scss" scoped>
button:disabled {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
