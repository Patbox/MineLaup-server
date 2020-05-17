<template>
  <div class="flex flex-row">
    <div class="flex-1 p-4">
      <h1 class="font-bold text-3xl trext-gray-900 uppercase">
        {{ $t('pages.settings.user-information') }}
      </h1>

      <form class="p-10 items-center" @submit.prevent="updateInfos">
        <div class="px-10 w-2/3 mb-6">
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
          :label="$t('pages.settings.username')"
          icon="user"
          class="w-2/3 mb-4"
          autocomplete="off"
          :error="errors.username ? $t(errors.username.errorKey) : ''"
        />

        <t-input
          id="email"
          v-model="form.email"
          :label="$t('pages.settings.email')"
          icon="envelope"
          class="w-2/3 mb-4"
          autocomplete="off"
          type="email"
          :error="errors.email ? $t(errors.email.errorKey) : ''"
        />

        <t-checkbox
          id="color-mode"
          v-model="form.colorMode"
          class="w-2/3 mb-4"
          :label="$t('pages.settings.color-mode')"
          :on-text="$t('pages.settings.color-dark')"
          :off-text="$t('pages.settings.color-light')"
          :error="errors.colorMode ? $t(errors.colorMode.errorKey) : ''"
        ></t-checkbox>

        <div class="divide-y"></div>

        <t-input
          id="password"
          v-model="form.password"
          :label="$t('pages.settings.password')"
          icon="lock"
          class="w-2/3 mb-4"
          autocomplete="off"
          type="password"
          :error="errors.password ? $t(errors.password.errorKey) : ''"
        />

        <div class="w-2/3 text-center">
          <t-button
            class="w-1/2"
            icon="user-edit"
            type="submit"
            :disabled="!formValid"
          >
            {{ $t('pages.settings.submit') }}
          </t-button>
        </div>
      </form>
    </div>
    <div class="flex-1 p-4">
      <h1 class="font-bold text-3xl trext-gray-900 uppercase">
        {{ $t('pages.settings.password-update') }}
      </h1>

      <form class="p-10 items-center" @submit.prevent="updatePassword">
        <div class="px-10 w-2/3 mb-6">
          <div
            v-if="error2Msg"
            class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <i class="fas fa-exclamation-circle w-4 h-4 mr-2"></i>
            <p>{{ $t(error2Msg) }}</p>
          </div>
        </div>

        <t-input
          id="current-password"
          v-model="formPass.current"
          :label="$t('pages.settings.current_password')"
          icon="lock"
          class="w-2/3 mb-4"
          type="password"
          :error="errors.current ? $t(errors.current.errorKey) : ''"
        />

        <t-input
          id="new_password"
          v-model="formPass.new"
          :label="$t('pages.settings.new_password')"
          icon="lock"
          class="w-2/3 mb-4"
          type="password"
          :error="errors.new ? $t(errors.new.errorKey) : ''"
        />

        <t-input
          id="confirm_password"
          v-model="formPass.confirm"
          :label="$t('pages.settings.confirm_password')"
          icon="lock"
          class="w-2/3 mb-4"
          type="password"
          :error="errors.confirm ? $t(errors.confirm.errorKey) : ''"
        />

        <div class="w-2/3 text-center">
          <t-button
            class="w-1/2"
            icon="user-edit"
            type="submit"
            :disabled="!formPassValid"
          >
            {{ $t('pages.settings.submit') }}
          </t-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { ColorMode } from '../types/ColorMode'
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
export default class Settings extends Vue {
  form = {
    username: '',
    password: '',
    email: '',
    colorMode: false,
  }

  formPass = {
    current: '',
    new: '',
    confirm: '',
  }

  errorMsg: string = ''
  error2Msg: string = ''
  errors = {}

  layout() {
    return 'side-bar'
  }

  async asyncData({ $auth }: Context) {
    try {
      await $auth.fetchUser()
    } catch (error) {
      $auth.logout()
    }
  }

  mounted() {
    this.form.username = this.$auth.user.username || ''
    this.form.email = this.$auth.user.email || ''
    this.form.colorMode = this.$auth.user.colorMode === 'DARK'
  }

  async updateInfos() {
    await this.$axios
      .post('/api/auth/update', {
        username: this.form.username,
        email: this.form.email || '',
        colorMode: this.form.colorMode ? ColorMode.DARK : ColorMode.LIGHT,
        password: this.form.password,
      })
      .then(async (response) => {
        await this.$auth.setUser(response.data.user)
        await this.$auth.setUserToken(response.data.token)
        this.$colorMode.preference = this.$auth.user.colorMode.toLowerCase()
      })
      .catch((error) => {
        if (error.response?.status) {
          switch (error.response.status) {
            case 400:
              this.errors = Object.assign({}, error.response.data.errors)
              break
            case 403:
              this.errorMsg = error.response.data.errorKey
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

  async updatePassword() {
    await this.$axios
      .post('/api/auth/change-password', this.formPass)
      .then(async (response) => {
        await this.$auth.setUser(response.data.user)
        await this.$auth.setUserToken(response.data.token)
      })
      .catch((error) => {
        if (error.response?.status) {
          switch (error.response.status) {
            case 400:
              this.errors = Object.assign({}, error.response.data.errors)
              break
            case 403:
              this.errorMsg = error.response.data.errorKey
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

  get formValid() {
    return this.form.username.length > 0 && this.form.password.length > 0
  }

  get formPassValid() {
    return (
      this.formPass.current.length > 0 &&
      this.formPass.new.length > 0 &&
      this.formPass.new === this.formPass.confirm
    )
  }
}
</script>
