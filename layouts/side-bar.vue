<template>
  <div class="h-screen flex flex-col">
    <nav-bar></nav-bar>

    <div class="flex flex-1 flex-row">
      <div
        class="flex-none flex flex-col items-center text-center bg-gray-700 text-gray-400 w-12"
      >
        <ul class="mt-2">
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
}
</script>
