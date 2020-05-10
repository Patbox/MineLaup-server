<template>
  <div class="flex flex-row justify-center content-center p-4">
    <div
      class="rounded shadow-lg p-8 bg-gray-800 text-white my-auto lg:w-1/2 md:w-2/3 w-full mx-4 shadow shadow-2xl"
    >
      <img
        src="~/assets/images/logo-1024.png"
        alt="App logo"
        class="w-56 px-10 mx-auto"
      />
      <h1 class="font-bold text-3xl mb-2 uppercase text-center leading-none">
        {{ $t('pages.login.title') }}
      </h1>

      <form @submit="login">
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
          class="w-full sm:px-10 mb-6"
          :label="$t('pages.login.username')"
          icon="user"
          :error="errors.username ? $(errors.username.error) : ''"
        />

        <t-input
          id="password"
          v-model="form.password"
          class="w-full sm:px-10 mb-6"
          :label="$t('pages.login.password')"
          icon="lock"
          type="password"
          :error="errors.password ? $(errors.password.error) : ''"
        />

        <div class="w-full text-center">
          <t-button type="submit" icon="sign-in-alt" class="md:w-1/3 w-full">
            {{ $t('pages.login.btn') }}
          </t-button>
        </div>
      </form>
    </div>
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
export default class Login extends Vue {
  errorMsg: string = ''

  errors = {}

  form = {
    username: '',
    password: '',
  }

  login() {}
}
</script>
