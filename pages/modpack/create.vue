<template>
  <div>
    <h1 class="font-bold text-3xl text-gray-900 dark:text-white uppercase">
      {{ $t('pages.modpack.create.title') }}
    </h1>

    <form class="p-10" @submit.prevent="createModpack">
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

      <t-input
        id="name"
        v-model="form.name"
        :label="$t('pages.modpack.create.name')"
        icon="user"
        class="w-1/3 mb-4"
        :error="errors.name ? $t(errors.name.errorKey) : ''"
      />

      <t-textarea
        id="description"
        v-model="form.description"
        :label="$t('pages.modpack.create.description')"
        class="w-1/3 mb-4"
        icon="book"
        rows="5"
      ></t-textarea>

      <div class="w-1/3 text-center">
        <t-button class="w-1/2" icon="folder-plus" type="submit">
          {{ $t('pages.modpack.create.submit') }}
        </t-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TInput from '~/components/form/TInput.vue'
import TTextarea from '~/components/form/TTextarea.vue'
import TButton from '~/components/form/TButton.vue'

@Component({
  components: {
    TInput,
    TTextarea,
    TButton,
  },
})
export default class ModpackCreate extends Vue {
  errorMsg: string = ''

  errors = {}

  form = {
    name: '',
    description: '',
  }

  createModpack() {
    this.errorMsg = ''
    this.errors = {}

    this.$axios
      .post('/api/modpack/create', this.form)
      .then(() => {
        this.$router.push('/modpack')
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
}
</script>
