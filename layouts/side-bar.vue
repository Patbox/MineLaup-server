<template>
  <div class="h-screen flex flex-col">
    <nav-bar></nav-bar>

    <div class="flex flex-1 flex-row dark:bg-gray-900 dark:text-white">
      <div
        class="flex-none flex flex-col items-center text-center bg-gray-700 text-gray-400 w-12"
      >
        <ul class="mt-2 flex-1">
          <t-side-bar-button
            :name="$t('layout.side-bar.launcher')"
            icon="rocket"
            to="/launcher"
          />
          <t-side-bar-button
            :name="$t('layout.side-bar.modpacks')"
            icon="box-open"
            to="/modpack"
          />
          <t-side-bar-button
            v-if="hasAdminPermission"
            :name="$t('layout.side-bar.administration')"
            icon="user-cog"
            to="/admin"
          />
        </ul>
        <ul class="mb-2">
          <li class="cursor-pointer select-none" @click="toggleColorMode">
            <span class="transition ease-in duration-150">
              <i v-if="$auth.user.colorMode === 'DARK'" class="fas fa-moon"></i>
              <i v-else class="fas fa-sun"></i>
            </span>
            <span class="text-xs">
              {{ $auth.user.colorMode }}
            </span>
          </li>
        </ul>
      </div>

      <nuxt class="flex-1" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { UserRole } from '../types/UserRole'
import NavBar from '~/components/global/NavBar.vue'
import TSideBarButton from '~/components/sidebar/TSideBarButton.vue'

@Component({
  components: {
    NavBar,
    TSideBarButton,
  },
})
export default class SideBar extends Vue {
  get hasAdminPermission() {
    return this.$auth.user.role >= UserRole.admin
  }

  async asyncData() {
    await this.$auth.fetchUser()
  }

  toggleColorMode() {
    const settings = { ...this.$auth.user }
    settings.colorMode = settings.colorMode === 'DARK' ? 'LIGHT' : 'DARK'
    this.$colorMode.preference = settings.colorMode.toLowerCase()
    this.$auth.setUser(settings)
  }

  mounted() {
    console.log(this.$colorMode)
  }
}
</script>
