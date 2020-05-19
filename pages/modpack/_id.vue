<template>
  <div>
    <div class="bg-gray-300 dark:bg-gray-700 flex flex-col">
      <div class="px-8 py-4 flex-1 flex flex-row">
        <div class="w-32 h-32 bg-gray-500 rounded-lg">
          <img
            v-if="modpack.hasPicture"
            :src="'/assets/' + modpack.id + '.png'"
            alt=""
          />
          <span
            v-else
            class="mr-4 text-gray-300 w-full h-full flex items-center justify-center rounded"
          >
            <span class="fa-stack fa-2x">
              <i class="fas fa-image fa-stack-2x"></i>
              <i class="fas fa-slash fa-stack-2x"></i>
            </span>
          </span>
        </div>
        <div class="flex-1 flex flex-col pl-4">
          <h1 class="text-3xl leading-none mb-1 font-bold">
            {{ modpack.name }}
          </h1>
          <h2 class="text-base italic text-gray-700 dark:text-gray-300">
            {{ modpack.description }}
          </h2>
        </div>
      </div>
      <div class="flex flex-row h-10 justify-center items-center">
        <nuxt-link
          :to="'/modpack/' + modpack.id"
          class="border-b-2 px-2 py-2 border-transparent"
          exact-active-class="border-green-400"
        >
          {{ $t('pages.modpack.view.nav.version') }}
        </nuxt-link>
        <nuxt-link
          :to="'/modpack/' + modpack.id + '/minecraft'"
          class="border-b-2 px-2 py-2 border-transparent"
          exact-active-class="border-green-400"
        >
          {{ $t('pages.modpack.view.nav.minecraft') }}
        </nuxt-link>
        <nuxt-link
          class="border-b-2 px-2 border-transparent py-2"
          :to="'/modpack/' + modpack.id + '/mods'"
          active-class="border-green-400"
        >
          {{ $t('pages.modpack.view.nav.mods') }}
        </nuxt-link>
        <nuxt-link
          class="border-b-2 px-2 border-transparent py-2"
          :to="'/modpack/' + modpack.id + '/config'"
          active-class="border-green-400"
        >
          {{ $t('pages.modpack.view.nav.configuration') }}
        </nuxt-link>
        <nuxt-link
          class="border-b-2 px-2 border-transparent py-2"
          :to="'/modpack/' + modpack.id + '/settings'"
          active-class="border-green-400"
        >
          {{ $t('pages.modpack.view.nav.settings') }}
        </nuxt-link>
      </div>
    </div>
    <div class="flex-1">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

@Component
export default class ModpackView extends Vue {
  modpack: any = []

  async asyncData({ $axios, route }: Context) {
    const { modpack } = await $axios
      .$get('/api/modpack', {
        params: {
          id: route.params.id,
        },
      })
      .catch((error) => {
        if (error?.response.status === 404) {
          this.$router.push('/modpack')
        }
      })

    return {
      modpack,
    }
  }
}
</script>
