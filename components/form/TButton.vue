<template>
  <button
    class="px-4 py-2 border rounded-full focus:outline-none transition ease-out duration-300"
    :class="[
      !disabled ? 'hover:text-' + hoverColor : '',
      'border-' + bgHoverColor,
      {
        'border-gray-600 text-gray-500 cursor-auto': disabled,
        ['text-' +
        color +
        ' bg-' +
        bgColor +
        ' hover:bg-' +
        bgHoverColor +
        ' hover:text-' +
        hoverColor]: !disabled,
      },
    ]"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <i
      v-if="icon"
      class="fas w-4 h-4 mr-2"
      :class="[
        !disabled ? 'hover:text-' + hoverColor : '',
        'fa-' + icon,
        {
          'border-gray-600 text-gray-500 cursor-auto': disabled,
          [' hover:text-' + hoverColor]: !disabled,
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
  @Prop({ default: 'white' })
  hoverColor!: String

  @Prop({ default: 'green-400' })
  bgHoverColor!: string

  @Prop({ default: 'transparent' })
  bgColor!: string

  @Prop({ default: 'gray-900' })
  color!: string

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
