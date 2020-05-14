<template>
  <div>
    <h1 class="font-bold text-3xl trext-gray-900 uppercase">
      {{ $t('pages.admin.user-edit.title') }}
    </h1>

    <form class="p-10" @submit.prevent="update">
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
        id="username"
        v-model="form.username"
        :label="$t('pages.admin.users.update.username')"
        icon="user"
        class="w-1/3 mb-4"
        autocomplete="off"
        :error="errors.username ? $t(errors.username.errorKey) : ''"
      />

      <t-input
        id="email"
        v-model="form.email"
        :label="$t('pages.admin.users.update.email')"
        icon="envelope"
        class="w-1/3 mb-4"
        autocomplete="off"
        type="email"
        :error="errors.email ? $t(errors.email.errorKey) : ''"
      />

      <t-select
        id="role"
        v-model="form.role"
        class="w-1/3 mb-4"
        :label="$t('pages.admin.users.update.role')"
        :items="items"
        default="user"
        icon="user-tag"
        :error="errors.role ? $t(errors.role.errorKey) : ''"
      ></t-select>

      <t-checkbox
        id="color-mode"
        v-model="form.colorMode"
        class="w-1/3 mb-4"
        :label="$t('pages.admin.users.update.color-mode')"
        :on-text="$t('pages.admin.users.update.color-dark')"
        :off-text="$t('pages.admin.users.update.color-light')"
        :error="errors.colorMode ? $t(errors.colorMode.errorKey) : ''"
      ></t-checkbox>

      <div class="w-1/3 text-center">
        <t-button class="w-1/2" icon="user-edit" type="submit">
          {{ $t('pages.admin.users.update.submit') }}
        </t-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import TInput from '~/components/form/TInput.vue'
import TButton from '~/components/form/TButton.vue'
import TSelect from '~/components/form/TSelect.vue'
import TCheckbox from '~/components/form/TCheckbox.vue'

@Component({
  components: {
    TInput,
    TButton,
    TSelect,
    TCheckbox,
  },
})
export default class UserEdit extends Vue {
  user!: {
    id: string
    username: string
    email: string
    role: number
    colorMode: string
  }

  form = {
    username: '',
    email: '',
    role: 'user',
    colorMode: false,
  }

  errorMsg: string = ''

  errors = {}

  items = ['admin', 'moderator', 'user']

  middleware({ route, redirect }: Context) {
    if (!route.params.id) {
      redirect('/admin/users')
    }
  }

  async asyncData({ $axios, route }: Context) {
    const { user } = await $axios.$get('/api/admin/user', {
      params: {
        id: route.params.id,
      },
    })

    return {
      user,
    }
  }

  mounted() {
    this.form.username = this.user.username
    this.form.email = this.user.email
    this.form.colorMode = this.user.colorMode === 'DARK'

    switch (this.user.role) {
      case 3:
      case 2:
        this.form.role = this.items[0]
        break
      case 1:
        this.form.role = this.items[1]
        break
      default:
        this.form.role = this.items[2]
    }
  }

  async update() {
    await this.$axios
      .post(
        '/api/admin/update-user',
        {
          username: this.form.username,
          email: this.form.email || '',
          role: this.form.role,
          colorMode: this.form.colorMode ? 'DARK' : 'LIGHT',
        },
        {
          params: {
            id: this.user.id,
          },
        }
      )
      .then(() => {
        this.$router.push('/admin/users')
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
          console.error(error)
          this.errorMsg = 'error.unknown'
        }
      })
  }
}
</script>
