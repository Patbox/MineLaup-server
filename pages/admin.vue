<template>
  <div class="flex flex-row">
    <t-side-bar-menu>
      <t-side-bar-group name="test">
        <t-side-bar-item to="/admin" exact>Item</t-side-bar-item>
        <t-side-bar-item to="/admin/users">
          {{ $t('pages.admin.users.nav-item') }}
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
})
export default class Admin extends Vue {
  layout() {
    return 'side-bar'
  }
}
</script>
