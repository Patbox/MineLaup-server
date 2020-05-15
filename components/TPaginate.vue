<template>
  <div class="flex flex-col items-center">
    <div class="flex text-gray-700 dark:text-gray-300">
      <nuxt-link
        v-if="current > 1"
        :to="changePage(current - 1)"
        class="h-10 w-10 mr-1 flex justify-center items-center rounded-full hover:bg-gray-300 dark-hover:bg-gray-700 cursor-pointer"
      >
        <i class="text-xl fas fa-caret-left"></i>
      </nuxt-link>

      <nuxt-link
        v-for="index in list"
        :key="index"
        :to="changePage(index + 1)"
        class="h-10 w-10 mr-1 flex justify-center items-center rounded-full cursor-pointer"
        :class="{
          'bg-green-400 text-white': current === index + 1,
          'hover:bg-gray-300 dark-hover:bg-gray-700': current !== index + 1,
        }"
      >
        {{ index + 1 }}
      </nuxt-link>

      <nuxt-link
        v-if="current < last"
        :to="changePage(current + 1)"
        class="h-10 w-10 mr-1 flex justify-center items-center rounded-full hover:bg-gray-300 dark-hover:bg-gray-700 cursor-pointer"
      >
        <i class="text-xl fas fa-caret-right"></i>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { range } from 'lodash'

@Component
export default class TPagination extends Vue {
  @Prop({ type: Number, required: true })
  current!: number

  @Prop({ type: Number, required: true })
  last!: number

  @Prop({ type: Function, required: true })
  changePage!: Function

  get list() {
    if (this.last > 6) {
    } else {
      return range(this.last)
    }
  }
}
</script>
