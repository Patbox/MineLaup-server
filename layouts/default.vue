<template>
  <div class="h-screen flex flex-col">
    <nav-bar></nav-bar>
    <nuxt class="flex-1" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import NavBar from '~/components/global/NavBar.vue'
@Component({
  components: {
    NavBar,
  },
})
export default class Default extends Vue {
  async mounted() {
    await this.$auth.fetchUser()
  }
}
</script>
