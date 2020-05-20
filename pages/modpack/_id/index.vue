<template>
  <div v-if="versions.length" class="pt-4 flex flex-col items-center">
    <div class="my-2">
      <div class="px-10 w-full md:1/3 mx-auto mb-6">
        <div
          v-if="errorMsg"
          class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <i class="fas fa-exclamation-circle w-4 h-4 mr-2"></i>
          <p>{{ $t(errorMsg) }}</p>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div
        v-for="(version, index) in versions"
        :key="version.id"
        class="p-4 border-b first:border-t border-gray-400 hover:bg-gray-200 transition-colors duration-150 ease-out flex flex-row"
      >
        <span>
          {{ version.name }}
        </span>
        <span class="italic text-gray-500 flex-1 text-center">
          {{ version.version }}
        </span>
        <div v-if="index === 0">
          <span
            class="hover:text-red-600 transition duration-150 ease-out cursor-pointer"
            @click="openModal(version)"
          >
            <i class="fas fa-trash"></i>
          </span>
        </div>
      </div>
    </div>

    <t-modal v-if="modalOpened">
      <h1 slot="title">
        {{ $t('pages.modpack.view.version.modal.delete') }}
      </h1>
      <p slot="description">
        {{
          $t('pages.modpack.view.version.modal.description', {
            v: `${selectedVersion.name} (${selectedVersion.version})`,
          })
        }}
      </p>
      <div slot="actions" class="flex flex-col items-center">
        <t-button
          bg-hover-color="red-600"
          dark-bg-hover-color="red-600"
          class="flex-1 mb-2 md:w-1/2"
          @click="deleteVersion"
        >
          {{ $t('pages.modpack.view.version.modal.delete-btn') }}
        </t-button>
        <t-button
          class="flex-1 md:w-1/2"
          bg-hover-color="gray-800"
          dark-bg-hover-color="gray-800"
          @click="closeModal"
        >
          {{ $t('pages.modpack.view.version.modal.cancel-btn') }}
        </t-button>
      </div>
    </t-modal>
  </div>
  <div v-else class="p-4 flex flex-col items-center">
    <p class="mb-4">
      {{ $t('pages.modpack.view.version.title') }}
    </p>
    <t-button
      class="w-1/3"
      icon="plus"
      @click="$router.push('/modpack/' + $route.params.id + '/version/new')"
    >
      {{ $t('pages.modpack.view.version.new') }}
    </t-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TButton from '~/components/form/TButton.vue'
import TModal from '~/components/TModal.vue'

@Component({
  components: {
    TButton,
    TModal,
  },
})
export default class ModpackViewIndex extends Vue {
  versions = []
  modalOpened = false
  selectedVersion: { id: number } | null = null

  errorMsg: string = ''

  async fetch() {
    const { versions } = await this.$axios.$get('/api/modpack/versions', {
      params: {
        id: this.$route.params.id,
      },
    })

    this.versions = versions
  }

  openModal(version: any) {
    this.modalOpened = true
    this.selectedVersion = version
  }

  closeModal() {
    this.modalOpened = false
    this.selectedVersion = null
  }

  async deleteVersion() {
    if (this.selectedVersion !== null) {
      try {
        await this.$axios.delete('/api/modpack/version', {
          params: {
            id: this.selectedVersion.id,
          },
        })

        this.versions = this.versions.filter((version: { id: string }) => {
          // @ts-ignore
          return version.id !== this.selectedVersion.id
        })
        this.closeModal()
      } catch (error) {
        // eslint-disable-next-line
        console.error(error.response.data.message)
        this.errorMsg = 'error.unknown'
      }
    }
  }
}
</script>
