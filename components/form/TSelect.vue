<template>
  <div>
    <label
      :for="id"
      class="block uppercase tracking-wide text-gray-600 font-bold mb-2"
    >
      {{ label }}
    </label>
    <div class="relative">
      <span
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center pl-4"
      >
        <i class="fas text-gray-700 w-4 h-4" :class="'fa-' + icon"></i>
      </span>
      <div
        :id="id"
        class="appearance-none w-full bg-gray-300 rounded-full px-10 py-2 focus:outline-none text-black shadow transition ease-out duration-700 cursor-pointer select-none"
        :class="{ 'shadow-lg': showMenu }"
        @click="showMenu = !showMenu"
      >
        {{ currentValue }}
      </div>
      <span class="absolute inset-y-0 right-0 flex items-center pr-4">
        <i class="fas fa-caret-down text-gray-700 w-4 h-4 cursor-pointer"></i>
      </span>

      <ul
        v-if="showMenu"
        class="absolute w-full rounded-lg shadow shadow-lg z-50 overflow-x-auto bg-white select-none p-1"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          class="text-black border-b last:border-transparent border-gray-400 px-4 py-2 hover:bg-gray-200 cursor-pointer"
          :class="{ 'text-green-600': item == value }"
          @click="changeValue(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <p v-if="error" class="text-red-500 text-xs italic absolute">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class TSelect extends Vue {
  @Prop({ required: true })
  id!: string

  @Prop({ required: true })
  value!: string

  @Prop()
  default!: string

  @Prop({ required: true })
  label!: string

  @Prop()
  icon!: string

  @Prop()
  error!: string

  @Prop({ required: true, type: Array })
  items!: string[]

  showMenu = false

  mounted() {
    window.addEventListener('click', (event) => {
      event.stopPropagation()
      const el = this.$el.querySelector(`#${this.id}`)
      if (el && !el.contains(event.target as Node)) {
        this.showMenu = false
      }
    })
  }

  changeValue(value: string) {
    this.$emit('input', value)
    this.showMenu = false
  }

  get currentValue() {
    return this.value.length > 0 ? this.value : this.default
  }
}
</script>
