<template>
  <div class="flex flex-row">
    <t-side-bar-menu>
      <t-side-bar-item to="/modpack/create" class="flex items-center">
        <span
          class="mr-4 bg-gray-300 text-gray-700 w-10 h-10 flex items-center justify-center rounded"
        >
          <i class="fas fa-plus"></i>
        </span>
        <span class="flex-1">
          {{ $t('pages.modpack.create.title') }}
        </span>
      </t-side-bar-item>

      <t-side-bar-group :name="$t('pages.modpack.your-modpacks')" class="mt-4">
        <t-side-bar-item
          v-for="modpack in modpacks"
          :key="modpack.id"
          :to="'/modpack/' + modpack.id"
          class="flex items-center"
        >
          <span
            class="mr-4 bg-gray-300 text-gray-700 w-10 h-10 flex items-center justify-center rounded"
          >
            <span class="fa-stack fa-1x">
              <i class="fas fa-image fa-stack-1x"></i>
              <i class="fas fa-slash fa-stack-1x"></i>
            </span>
          </span>
          <span class="flex-1">
            {{ modpack.name }}
          </span>
        </t-side-bar-item>
      </t-side-bar-group>
    </t-side-bar-menu>
    <div class="flex-1">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import TSideBarMenu from '~/components/sidebar/TSideBarMenu.vue'
import TSideBarItem from '~/components/sidebar/TSideBarItem.vue'
import TSideBarGroup from '~/components/sidebar/TSideBarGroup.vue'

@Component({
  components: {
    TSideBarItem,
    TSideBarMenu,
    TSideBarGroup,
  },
})
export default class Modpack extends Vue {
  modpacks: any = []

  layout() {
    return 'side-bar'
  }

  async asyncData({ $axios }: Context) {
    const { modpacks } = await $axios.$get('/api/modpack/list')

    return {
      modpacks,
    }
  }
}
</script>
