<template>
  <div class="flex flex-row">
    <t-side-bar-menu>
      <t-side-bar-group :name="$t('pages.admin.users.title')">
        <t-side-bar-item to="/admin/users" exact>
          {{ $t('pages.admin.users.list.title') }}
        </t-side-bar-item>
        <t-side-bar-item to="/admin/users/create" exact>
          {{ $t('pages.admin.users.create.title') }}
        </t-side-bar-item>
      </t-side-bar-group>
    </t-side-bar-menu>
    <div class="flex-1 p-4">
      <nuxt-child />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TSideBarMenu from '~/components/sidebar/TSideBarMenu.vue'
import TSideBarGroup from '~/components/sidebar/TSideBarGroup.vue'
import TSideBarItem from '~/components/sidebar/TSideBarItem.vue'

@Component({
  components: {
    TSideBarMenu,
    TSideBarGroup,
    TSideBarItem,
  },
  middleware: ['is-admin'],
})
export default class Admin extends Vue {
  layout() {
    return 'side-bar'
  }
}
</script>
