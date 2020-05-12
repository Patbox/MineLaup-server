<template>
  <form class="p-10" @submit.prevent="createUser">
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
      :label="$t('pages.admin.users.create.username')"
      icon="user"
      class="w-1/3 mb-4"
      autocomplete="off"
      :error="errors.username ? $t(errors.username.errorKey) : ''"
    />

    <t-input
      id="password"
      v-model="form.password"
      :label="$t('pages.admin.users.create.password')"
      icon="lock"
      class="w-1/3 mb-4"
      autocomplete="off"
      type="password"
      :error="errors.password ? $t(errors.password.errorKey) : ''"
    />

    <t-input
      id="email"
      v-model="form.email"
      :label="$t('pages.admin.users.create.email')"
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
      :label="$t('pages.admin.users.create.role')"
      :items="items"
      default="user"
      icon="user-tag"
      :error="errors.role ? $t(errors.role.errorKey) : ''"
    ></t-select>

    <div class="w-1/3 text-center">
      <t-button class="w-1/2" icon="user-plus" type="submit">
        {{ $t('pages.admin.users.create.submit') }}
      </t-button>
    </div>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TInput from '~/components/form/TInput.vue'
import TButton from '~/components/form/TButton.vue'
import TSelect from '~/components/form/TSelect.vue'

@Component({
  components: {
    TInput,
    TButton,
    TSelect,
  },
})
export default class CreateUser extends Vue {
  form = {
    username: '',
    password: '',
    email: '',
    role: 'user',
  }

  errorMsg: string = ''

  errors = {}

  items = ['admin', 'moderator', 'user']

  createUser() {
    this.errorMsg = ''
    this.errors = {}

    this.$axios
      .post('/api/admin/create-user', this.form)
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
        }
      })
  }
}
</script>
