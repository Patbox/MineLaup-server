<template>
  <div>
    <form class="p-10" @submit.prevent="createVersion">
      <div class="px-10 w-full md:1/3 mx-auto mb-6">
        <div
          v-if="errorMsg"
          class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
          role="alert"
        >
          <i class="fas fa-exclamation-circle w-4 h-4 mr-2"></i>
          <p>{{ $t(errorMsg) }}</p>
        </div>

        <t-input
          id="name"
          v-model="form.name"
          :label="$t('pages.modpack.version.new.name')"
          icon="code-branch"
          class="w-1/3 mb-4"
          :error="errors.name ? $t(errors.name.errorKey) : ''"
        />

        <div class="w-1/3 text-center">
          <t-button class="w-1/2" icon="plus" type="submit">
            {{ $t('pages.modpack.version.new.create') }}
          </t-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TInput from '~/components/form/TInput.vue'
import TButton from '~/components/form/TButton.vue'

@Component({
  components: {
    TInput,
    TButton,
  },
})
export default class ModpackNewVersion extends Vue {
  errorMsg: string = ''

  errors = {}

  form = {
    name: '',
  }

  createVersion() {}
}
</script>
