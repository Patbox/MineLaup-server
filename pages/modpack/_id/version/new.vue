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

        <t-input
          id="name"
          v-model="form.version"
          :label="$t('pages.modpack.version.new.version')"
          icon="code-branch"
          class="w-1/3 mb-4"
          :error="errors.version ? $t(errors.version.errorKey) : ''"
          @keypress="isValidSemVer"
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
    version: '',
    modpackId: '',
  }

  createVersion() {
    this.errorMsg = ''
    this.errors = {}

    this.form.modpackId = this.$route.params.id

    this.$axios
      .post('/api/modpack/versions/new', this.form)
      .then(() => {
        this.$router.push('/modpack/' + this.$route.params.id)
      })
      .catch((error) => {
        if (error.response?.status) {
          switch (error.response.status) {
            case 400:
              this.errors = Object.assign({}, error.response.data.errors)
              break
            case 500:
              this.errorMsg = error.response.data.errors[0].message
              break
            default:
              this.errorMsg = 'error.unknown'
          }
        } else {
          // eslint-disable-next-line
          console.error(error)
          this.errorMsg = 'error.unknown'
        }
      })
  }

  isValidSemVer(event: any) {
    const charCode = event.which ? event.which : event.keyCore
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.preventDefault()
    } else {
      return true
    }
  }
}
</script>
